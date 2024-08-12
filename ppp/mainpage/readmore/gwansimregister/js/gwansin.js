document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
      window.location.href = this.getAttribute('data-href');
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    // 모든 하트 버튼에 클릭 이벤트 리스너 추가
    document.querySelectorAll('.btn.heart').forEach(function(button) {
        button.addEventListener('click', function() {
            // 버튼 클릭 시 'liked' 클래스를 토글
            this.classList.toggle('liked');
        });
    });
});

window.addEventListener('DOMContentLoaded', () => {
  const heartButtons = document.querySelectorAll('.btn.heart');
  heartButtons.forEach(button => {
      button.addEventListener('click', function() {
          const message = document.getElementById('interestMessage');
          if (button.classList.contains('red')) {
              message.textContent = '관심 등록이 등록 되었습니다.';
          } else {
              message.textContent = '관심 등록이 취소 되었어요.';
          }
          message.style.display = 'block';
          setTimeout(() => {
              message.style.display = 'none';
          }, 1500);

          // Toggle heart color
          button.classList.toggle('red');
      });
  });
});

// 관심 목록에 새로운 애완동물을 추가하는 함수
function addPetToList(pet) {
    const petList = document.querySelector('.container'); // 관심 목록이 위치한 컨테이너
    const newPetCard = document.createElement('div');
    newPetCard.classList.add('pet-card');
    newPetCard.innerHTML = `
        <img src="${pet.image}" alt="${pet.name}">
        <div class="pet-info">
            <h5>이름: ${pet.name}</h5>
            <p>나이: ${pet.age}</p>
            <p>주소: ${pet.address}</p>
        </div>
        <button class="btn heart red" aria-label="Like">
            <i class="fas fa-heart"></i>
        </button>
        <div class="interest-message" style="display: none;">관심 등록이 되었습니다.</div>
    `;
    petList.appendChild(newPetCard);
}

document.addEventListener('DOMContentLoaded', function() {
    // 드롭다운 메뉴 항목 클릭 시 페이지 이동
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            window.location.href = this.getAttribute('data-href');
        });
    });

    // 모든 하트 버튼에 클릭 이벤트 리스너 추가
    document.querySelectorAll('.btn.heart').forEach(function(button) {
        button.addEventListener('click', async function() {
            // 버튼의 현재 상태 확인
            const isLiked = this.classList.contains('red');
            const petInfo = this.parentElement.querySelector('.pet-info h5').textContent.split(': ')[1];
            const endpoint = isLiked ? '/api/interest/remove' : '/api/interest/add';

            // 서버에 요청 보내기
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ petName: petInfo })
            });

            if (response.ok) {
                const data = await response.json();
                // 서버 응답에 따라 메시지 업데이트
                const message = this.nextElementSibling;
                if (isLiked) {
                    message.textContent = '관심 등록이 취소되었습니다.';
                } else {
                    message.textContent = '관심 등록이 되었습니다.';
                    // 관심 목록에 추가된 내용 반영
                    addPetToList(data.pet);
                }
                message.style.display = 'block';
                setTimeout(() => {
                    message.style.display = 'none';
                }, 1500);
                // Toggle heart color
                this.classList.toggle('red');
            } else {
                alert('서버에 문제가 발생했습니다. 다시 시도해 주세요.');
            }
        });
    });

    // 관심 목록에 새로운 애완동물을 추가하는 함수
    function addPetToList(pet) {
        const petList = document.querySelector('.container'); // 관심 목록이 위치한 컨테이너
        const newPetCard = document.createElement('div');
        newPetCard.classList.add('pet-card');
        newPetCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}">
            <div class="pet-info">
                <h5>이름: ${pet.name}</h5>
                <p>나이: ${pet.age}</p>
                <p>주소: ${pet.address}</p>
            </div>
            <button class="btn heart red" aria-label="Like">
                <i class="fas fa-heart"></i>
            </button>
            <div class="interest-message" style="display: none;">관심 등록이 되었습니다.</div>
        `;
        petList.appendChild(newPetCard);

        // 새로 추가된 카드에도 클릭 이벤트 리스너 추가
        newPetCard.querySelector('.btn.heart').addEventListener('click', async function() {
            // 버튼의 상태에 따라 적절한 메시지와 API 요청을 설정
            const isLiked = this.classList.contains('red');
            const petInfo = this.parentElement.querySelector('.pet-info h5').textContent.split(': ')[1];
            const endpoint = isLiked ? '/api/interest/remove' : '/api/interest/add';

            // 서버에 요청 보내기
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ petName: petInfo })
            });

            if (response.ok) {
                const message = this.nextElementSibling;
                if (isLiked) {
                    message.textContent = '관심 등록이 취소되었습니다.';
                } else {
                    message.textContent = '관심 등록이 되었습니다.';
                }
                message.style.display = 'block';
                setTimeout(() => {
                    message.style.display = 'none';
                }, 1500);
                // Toggle heart color
                this.classList.toggle('red');
            } else {
                alert('서버에 문제가 발생했습니다. 다시 시도해 주세요.');
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // localStorage에서 선택된 동물 정보 가져오기
    const selectedPet = JSON.parse(localStorage.getItem('selectedPet'));
  
    if (selectedPet) {
      document.querySelector('.container h1').innerText = selectedPet.details.split('<br/>')[1].split('이름 : ')[1]; // 이름을 제목으로 사용
      document.querySelector('.pet-card img').src = selectedPet.image;
      document.querySelector('.pet-card .pet-info').innerHTML = `
        <h5>주소: ${selectedPet.address}</h5>
        ${selectedPet.details}
      `;
    }
  });
  