$(document).ready(function() {
    // 두더지 이미지 배열
    let ddgImages = ["ddg.png"];
    // 게임 상태 관리 변수들
    let score = 0, time = 10, timer, moleTimer, currentMoleIndex = -1;

    let scoreS = $("#score"), timeS = $("#time"), squares = $(".square");

    // 시작 및 다시 시작 버튼 클릭 시 이벤트 처리
    $("#startBtn, #restartBtn").click(function() {
        resetGame();
        startGame();
    });

    // 게임 시작 함수
    function startGame() {
        // 타이머를 설정
        timer = setInterval(function() {
            time--;
            updateTime();
            if (time === 0) endGame(); // 시간이 0이 되면 게임 종료
        }, 1000);
        showRandomMole(); // 두더지 나타나게 하기
    }

    // 게임 종료 하기
    function endGame() {
        clearInterval(timer); // 타이머 끝
        clearInterval(moleTimer); // 두더지 타이머 끝
        alert("게임 종료! 최종 점수: " + score); //점수 나오게 하기
        resetGame(); // 게임 초기화
    }

    // 게임 초기화 함수
    function resetGame() {
        clearInterval(timer); // 타이머 중지
        clearInterval(moleTimer); // 두더지 타이머 중지
        score = 0; time = 10; currentMoleIndex = -1; // 점수, 시간, 두더지 인덱스를 초기화
        updateScore(); updateTime(); // 점수와 시간을 업데이트 하기
        squares.removeClass("active").css("background-image", ""); // 모든 사각형을 초기화
    }

    // 랜덤한 위치에 두더지 이미지 표시 함수
    function showRandomMole() {
        // 이전 두더지 사각형 초기화
        if (currentMoleIndex !== -1) squares.eq(currentMoleIndex).removeClass("active").css("background-image", "");
        
        // 두더지 다른 사각형에서 나오게 하기
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * squares.length);
        } while (randomIndex === currentMoleIndex); // 같은 위치가 나오지 않도록 하기

        currentMoleIndex = randomIndex; // 새 두더지 위치
        let randomImage = ddgImages[0]; // 이미지 나오게 하기

        // 선택된 사각형에 두더지 표시
        squares.eq(currentMoleIndex).css("background-image", "url('" + randomImage + "')").addClass("active");

        // 클릭 이벤트를 처리하여 두더지 클릭 시 점수가 증가되기
        squares.off('click').on('click', function() {
            if ($(this).is(squares.eq(currentMoleIndex))) {
                $(this).removeClass("active").css("background-image", "");
                score++; updateScore(); // 점수 증가를 업데이트
                showRandomMole(); // 새 두더지가 나오게 하기
                clearTimeout(moleTimer); // 현재 두더지 타이머는 취소되어 내려가기
                moleTimer = setTimeout(showRandomMole, 1000); // 다시 나타나는 두더지(ms초)
            }
        });//뭐가 문제니 너니 위에니 아래니 누구니 왜 안돼니 실행이

        // 일정 시간 후 두더지가 다른 곳에서 나타나게 타이머 설정
        clearTimeout(moleTimer); // 기존 타이머 내리기
        moleTimer = setTimeout(function() {
            squares.eq(currentMoleIndex).removeClass("active").css("background-image", "");
            showRandomMole(); // 새로운 두더지 표시
        }, 1000); // ms초 후 두더지 자동으로 사라짐
    }

    // 점수 업데이트를 하는 함수
    function updateScore() {
        scoreS.text(score); // 점수요소 업데이트
    }

    // 시간 업데이트 함수
    function updateTime() {
        timeS.text(time); // 시간요소 업데이트
    }
});