const express = require('express');
const path = require('path');
const http = require('http');
const oracledb = require('oracledb');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;
const HOST = '0.0.0.0'; // 모든 네트워크 인터페이스에서 수신
const ORACLE_LIB_DIR = 'D:\\oracle\\instantclient_19_24';

async function testConnection() {
    try {
        await oracledb.initOracleClient({ libDir: ORACLE_LIB_DIR });
        console.log('Oracle Client initialized');
    } catch (err) {
        console.error('Error initializing Oracle Client', err);
    }
}

async function initializeDatabase() {
    try {
        await oracledb.createPool({
            user: 'PPP',
            password: 'PPP',
            connectString: 'localhost:1521/XE'
        });
        console.log('Database connection pool created');
    } catch (err) {
        console.error('Error initializing database connection: ', err);
        process.exit(1);
    }
}

testConnection();
initializeDatabase();

app.use(cors({
    origin: 'http://localhost:5500', // 클라이언트의 포트와 맞추기
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/validate-userid', async (req, res) => {
    const { userid } = req.body;

    if (!userid) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const connection = await oracledb.getConnection();

        const result = await connection.execute(
            `SELECT COUNT(*) AS count FROM USERS WHERE USER_ID = :userid`,
            [userid]
        );

        const userExists = result.rows[0][0] > 0;

        res.json({ exists: userExists });

        await connection.close();
    } catch (err) {
        console.error('Error checking user ID: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/register', async (req, res) => {
    const { userid, password, phoneNumber, email, username, birthdate, address } = req.body;

    if (!userid || !password || !username || !phoneNumber || !email || !birthdate || !address) {
        return res.status(400).json({ success: false, message: '모든 정보를 입력해 주세요.' });
    }

    try {
        const connection = await oracledb.getConnection();

        const result = await connection.execute(
            `INSERT INTO USERS (USER_ID, PASSWORD, PHONE_NUMBER, EMAIL, USERNAME, BIRTHDATE, ADDRESS) 
             VALUES (:userid, :password, :phoneNumber, :email, :username, TO_DATE(:birthdate, 'YYYY-MM-DD'), :address)`,
            { userid, password, phoneNumber, email, username, birthdate, address },
            { autoCommit: true }
        );

        if (result.rowsAffected === 1) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: '회원가입 실패: 서버 오류가 발생했습니다.' });
        }

        await connection.close();
    } catch (err) {
        console.error('Error registering user: ', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

const rooms = {};

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', async ({ room, username, bkgNum }) => {
        console.log('Received room:', room);
        console.log('Received username:', username); 
        console.log('Received bkgNum:', bkgNum);

        if (!bkgNum) {
            console.error('BKG_NUM is undefined or null.');
            return;
        }

        const clients = rooms[room] || new Set();
        if (clients.size >= 3) {
            socket.emit('roomFull', { message: '채팅방이 가득 찼습니다.' });
            return;
        }

        clients.add(username);
        rooms[room] = clients;
        socket.join(room);
        console.log(`${username} joined room: ${room}`);

        try {
            const connection = await oracledb.getConnection();

            const result = await connection.execute(
                `SELECT COUNT(*) AS count FROM BROKERAGE WHERE BKG_NUM = :bkgNum`,
                [bkgNum]
            );

            if (result.rows[0][0] === 0) {
                throw new Error(`BKG_NUM ${bkgNum} does not exist in BROKERAGE table.`);
            }

            await connection.execute(
                `INSERT INTO CHAT (CHAT_ID, BKG_NUM, CHAT_SD, CHAT_STATUS) 
                 VALUES (CHAT_SEQ.NEXTVAL, :bkgNum, SYSTIMESTAMP, 'ACTIVE')`,
                [bkgNum]
            );
            await connection.commit();
            await connection.close();
        } catch (err) {
            console.error('Error inserting chat record: ', err);
        }

        io.to(room).emit('userJoined', { username });
    });

    socket.on('sendMessage', (data) => {
        const { room, message, sender, profileIcon } = data;
        socket.broadcast.to(room).emit('receiveMessage', { message, sender, profileIcon });
    });

    socket.on('sendFile', (data) => {
        const { room, fileData, fileType, fileName, sender, profileIcon } = data;
        socket.broadcast.to(room).emit('receiveFile', { fileData, fileType, fileName, sender, profileIcon });
    });

    socket.on('leaveRoom', async ({ room, username, bkgNum }) => {
        const clients = rooms[room];
        if (clients) {
            clients.delete(username);
            if (clients.size === 0) {
                delete rooms[room];
            }
        }

        if (!bkgNum) {
            console.error('BKG_NUM is undefined or null.');
            return;
        }

        try {
            const connection = await oracledb.getConnection();
            await connection.execute(
                `UPDATE CHAT SET CHAT_ED = SYSTIMESTAMP, CHAT_STATUS = 'INACTIVE' 
                 WHERE BKG_NUM = :bkgNum AND CHAT_STATUS = 'ACTIVE'`,
                [bkgNum]
            );
            await connection.commit();
            await connection.close();
        } catch (err) {
            console.error('Error updating chat record: ', err);
        }

        socket.leave(room);
    });

    socket.on('reportUser', async ({ room, reportedUser, reporter, bkgNum }) => {
        if (!bkgNum) {
            console.error('BKG_NUM is undefined or null.');
            return;
        }

        try {
            const connection = await oracledb.getConnection();
            await connection.execute(
                `INSERT INTO REPORT (RPT_ID, RPT_TYPE, RPT_TEXT, RPT_DATE, RPT_STATUS, U_NUM, CHAT_ID, BKG_NUM) 
                 VALUES (REPORT_SEQ.NEXTVAL, 'USER_REPORT', :rptText, SYSTIMESTAMP, 'PENDING', :uNum, :chatId, :bkgNum)`,
                { rptText: 'User reported', uNum: reporter, chatId: null, bkgNum: bkgNum }
            );
            await connection.commit();
            await connection.close();
        } catch (err) {
            console.error('Error inserting report: ', err);
        }

        io.to(room).emit('chatDisabled', { message: `상대방이 신고하여 채팅이 금지되었습니다.`, isReporter: false });
        socket.emit('chatDisabled', { message: `신고한 상대와는 채팅이 불가합니다.`, isReporter: true });
    });

    socket.on('submitReview', async ({ room, reviewText, rating, reviewer, bkgNum }) => {
        if (!bkgNum) {
            console.error('BKG_NUM is undefined or null.');
            return;
        }

        try {
            const connection = await oracledb.getConnection();
            
            const result = await connection.execute(
                `INSERT INTO REVIEW (RV_ID, BKG_NUM, RV_SCORE, RV_TEXT, RV_SD, REVIEWER) 
                 VALUES (REVIEW_SEQ.NEXTVAL, :bkgNum, :rvScore, :rvText, SYSTIMESTAMP, :reviewer)`,
                { bkgNum: bkgNum, rvScore: rating, rvText: reviewText, reviewer: reviewer },
                { autoCommit: true }
            );

            console.log('Review inserted: ', result.rowsAffected);

            if (result.rowsAffected === 1) {
                io.to(room).emit('reviewSubmitted', { reviewText, rating, reviewer });
            } else {
                console.error('Failed to insert review: ', result);
            }

            await connection.close();
        } catch (err) {
            console.error('Error inserting review: ', err);
        }
    });

    socket.on('deleteReview', async (data) => {
        const { room, reviewer, bkgNum, rvId } = data;
        
        if (!bkgNum || !rvId) {
            console.error('BKG_NUM or RV_ID is undefined or null.');
            return;
        }

        try {
            const connection = await oracledb.getConnection();
            await connection.execute(
                `DELETE FROM REVIEW WHERE BKG_NUM = :bkgNum AND RV_ID = :rvId`,
                { bkgNum: bkgNum, rvId: rvId }
            );
            await connection.commit();
            await connection.close();
        } catch (err) {
            console.error('Error deleting review: ', err);
        }

        io.to(room).emit('reviewDeleted', { reviewer });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}/`);
});
