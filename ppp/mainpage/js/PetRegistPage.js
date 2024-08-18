document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // 폼 제출을 막음

    var name = document.getElementById("name").value;
    var breed = document.getElementById("breed").value;
    var gender = document.querySelector("input[name='gender']:checked");

    if (!name || !breed || !gender) {
        alert("모든 필수 필드를 입력해주세요.");
        return;
    }

    var imgElement = document.getElementById("uploaded-image");
    if (imgElement.style.display === "none") {
        alert("사진을 업로드해주세요.");
        return;
    }

    // 서버에 보낼 데이터 객체
    var petData = {
        name: name,
        breed: breed,
        gender: gender.value,
        // 추가적인 필드가 있다면 여기에 포함
    };

    fetch('http://127.0.0.1:5500/register-pet', { // URL을 절대 경로로 수정
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData), // petData는 전송하려는 데이터 객체입니다.
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('서버 응답 오류');
        }
        return response.json(); // 응답이 JSON 형식이 아닌 경우의 오류 처리
    })
    .then(data => {
        if (data.success) {
            alert('애완동물 등록 성공'); // 서버에서 받은 메시지를 alert로 표시합니다.
            window.location.href = '../html/MyPage.html'; // 메인 페이지로 리디렉션
        } else {
            alert('애완동물 등록 실패: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('애완동물 등록 중 오류가 발생했습니다.'); // 에러 발생 시 메시지를 표시합니다.
    });
});
