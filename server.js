const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const fs = require('fs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();
const port = 5500;

// CORS 설정
const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    credentials: true,
    optionsSuccessStatus: 200
};

// Oracle Instant Client 경로 설정
oracledb.initOracleClient({ libDir: 'D:\\oracle\\instantclient_19_24' });

// 미들웨어 설정
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 86400000,
        sameSite: 'Lax'
    }
}));

// 메인 페이지를 루트 디렉토리에서 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'main.html'));
});

// 세션 고정 및 저장 미들웨어
app.use((req, res, next) => {
    const fixedSessionId = 'fixedSessionId123456'; // 강제로 고정할 세션 ID 설정

    if (!req.sessionID || req.sessionID !== fixedSessionId) {
        req.sessionID = fixedSessionId;
    }

    if (!req.session.user) {
        console.log('세션에 사용자 정보 없음, 세션 재생성 안함');
        req.session.user = { userid: 'fixedUser', username: 'Fixed User' };
    } else {
        console.log('기존 세션 사용:', req.sessionID);
    }

    req.session.save((err) => {
        if (err) {
            console.error('세션 저장 오류:', err);
            return res.status(500).json({ success: false, message: '세션 저장 중 오류가 발생했습니다.' });
        }
        next();
    });
});

// Oracle DB 연결 설정
const dbConfig = {
    user: 'PPP',
    password: 'PPP',
    connectString: 'localhost:1521/XE'
};

// Nodemailer 설정
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'suleehk@gmail.com',
        pass: 'dujy aizq nbhw xuut'
    }
});

// Multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// 회원가입 처리 엔드포인트
app.post('/api/register', async (req, res) => {
    const { userid, password, phoneNumber, email, username, address } = req.body;

    try {
        const connection = await oracledb.getConnection(dbConfig);

        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.execute(
            `INSERT INTO USERS (U_NUM, U_ID, U_PW, U_PHONE, EMAIL, U_NAME, U_ADD, U_DOJ, ADMIN, ACTIVATION) 
            VALUES (USERS_SEQ.NEXTVAL, :userid, :hashedPassword, :phoneNumber, :email, :username, :address, SYSDATE, 'N', 'Y')`,
            { userid, hashedPassword, phoneNumber, email, username, address },
            { autoCommit: true }
        );

        await connection.close();
        res.status(200).json({ success: true });
    } catch (err) {
        console.error('회원가입 오류:', err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

// 사용자 ID 중복 체크 엔드포인트
app.post('/api/validate-userid', async (req, res) => {
    const { userid } = req.body;

    try {
        const connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `SELECT U_ID FROM USERS WHERE U_ID = :userid`,
            { userid }
        );

        await connection.close();

        if (result.rows.length > 0) {
            res.status(200).json({ exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (err) {
        console.error('중복 확인 오류:', err.message);
        res.status(500).json({ exists: null, message: err.message });
    }
});

// 로그인 처리 엔드포인트
app.post('/api/login', (req, res) => {
    const { userid, password } = req.body;

    if (userid === 'jin' && password === 'password') {
        req.session.user = {
            userid: 'fixedUser',
            username: 'Fixed User'
        };
        console.log('세션 고정 및 저장 완료:', req.session);
        res.json({ success: true });
    } else {
        res.json({ success: false, message: '로그인 실패' });
    }
});

// 로그인 상태 확인 엔드포인트
app.get('/api/check-login', async (req, res) => {
    console.log('세션 정보:', req.session);

    if (req.session.user) {
        try {
            const connection = await oracledb.getConnection(dbConfig);
            const result = await connection.execute(
                `SELECT U_NAME FROM USERS WHERE U_ID = :userid`,
                { userid: req.session.user.userid }
            );
            console.log('로그인 상태 쿼리 결과:', result);
            await connection.close();

            if (result.rows.length > 0) {
                res.json({ loggedIn: true, username: req.session.user.username });
            } else {
                res.json({ loggedIn: false });
            }
        } catch (err) {
            console.error('로그인 상태 확인 오류:', err.message);
            res.status(500).json({ loggedIn: false, error: err.message });
        }
    } else {
        console.log('로그인 상태 확인: 세션에 사용자 정보 없음');
        res.json({ loggedIn: false });
    }
});

// 로그아웃 처리 경로
app.post('/api/logout', (req, res) => {
    req.session.destroy(); // 세션 파기
    res.status(200).send('로그아웃 성공'); // 로그아웃 성공 메시지 반환
});

// 인증코드 생성 함수
function generateRandomToken(length) {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
}

// 아이디 찾기 엔드포인트
app.post('/api/find-id', async (req, res) => {
    const { username, email } = req.body;

    try {
        const connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `SELECT U_ID FROM USERS WHERE U_NAME = :username AND EMAIL = :email`,
            { username, email }
        );

        await connection.close();

        if (result.rows.length > 0) {
            const userId = result.rows[0][0];
            res.status(200).json({ success: true, userId });
        } else {
            res.status(404).json({ success: false, message: '해당 이름과 이메일에 대한 아이디를 찾을 수 없습니다.' });
        }
    } catch (err) {
        console.error('쿼리 실행 오류:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// 비밀번호 재설정 요청 엔드포인트
app.post('/api/request-password-reset', async (req, res) => {
    const { userid, email } = req.body;

    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `SELECT U_NUM FROM USERS WHERE U_ID = :userid AND EMAIL = :email`,
            { userid, email }
        );

        if (result.rows.length > 0) {
            const authToken = generateRandomToken(6); // 6자리 인증코드 생성
            const tokenExpiry = new Date(Date.now() + 300 * 1000); // 5분 후 만료

            await connection.execute(
                `UPDATE USERS SET AUTH_TOKEN = :authToken, TOKEN_EXPIRY = :tokenExpiry WHERE U_ID = :userid AND EMAIL = :email`,
                { authToken, tokenExpiry, userid, email },
                { autoCommit: true }
            );

            await connection.close();

            // 이메일 발송
            const mailOptions = {
                from: 'suleehk@gmail.com',
                to: email,
                subject: '비밀번호 재설정 인증코드',
                text: `다음 인증코드를 사용하여 비밀번호를 재설정하세요: ${authToken}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('이메일 발송 오류:', error);
                    return res.status(500).json({ success: false, message: '이메일 발송 실패' });
                }
                res.status(200).json({ success: true, message: '인증코드가 이메일로 발송되었습니다.' });
            });
        } else {
            res.status(404).json({ success: false, message: '해당 사용자와 이메일이 존재하지 않습니다.' });
        }
    } catch (err) {
        console.error('비밀번호 재설정 요청 오류:', err.message);
        res.status(500).json({ success: false, message: err.message });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('연결 종료 오류:', err.message);
            }
        }
    }
});

// 비밀번호 재설정 엔드포인트
app.post('/api/reset-password', async (req, res) => {
    const { userid, authToken, newPassword } = req.body;

    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);

        // 인증토큰 검증
        const result = await connection.execute(
            `SELECT U_NUM FROM USERS WHERE U_ID = :userid AND AUTH_TOKEN = :authToken AND TOKEN_EXPIRY > SYSDATE`,
            { userid, authToken }
        );

        if (result.rows.length > 0) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await connection.execute(
                `UPDATE USERS SET U_PW = :hashedPassword, AUTH_TOKEN = NULL, TOKEN_EXPIRY = NULL WHERE U_ID = :userid`,
                { hashedPassword, userid },
                { autoCommit: true }
            );

            res.status(200).json({ success: true, message: '비밀번호가 성공적으로 재설정되었습니다.' });
        } else {
            res.status(400).json({ success: false, message: '인증코드가 유효하지 않거나 만료되었습니다.' });
        }
    } catch (err) {
        console.error('비밀번호 재설정 오류:', err.message);
        res.status(500).json({ success: false, message: err.message });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('연결 종료 오류:', err.message);
            }
        }
    }
});

app.listen(port, () => {
    console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
