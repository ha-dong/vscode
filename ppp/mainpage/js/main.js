//팝업
document.getElementById('closeButton').addEventListener('click', function() {
  var popup = document.getElementById('popup');
  popup.style.display = 'none';
});
//팝업
document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', function() {
    window.location.href = this.getAttribute('data-href');
  });
});

document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', function() {
      window.location.href = this.getAttribute('data-href');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // 모든 하트 버튼에 클릭 이벤트 리스너 추가
  document.querySelectorAll('.btn.heart').forEach(function(button) {
      button.addEventListener('click', function() {
          this.classList.toggle('liked');
          handleHeartClick(this);
      });
  });

  // 로컬스토리지에서 관심 목록을 불러와 UI에 반영
  const storedInterestList = JSON.parse(localStorage.getItem('interestList')) || [];
  storedInterestList.forEach(pet => {
      addPetToList(pet, false); // false는 새로 추가된 것이 아니라는 표시
  });
});

function handleHeartClick(button) {
  const message = document.getElementById('interestMessage');
  const petInfo = button.closest('.card-body').querySelector('.card-text').innerHTML;
  const petImage = button.closest('.card').querySelector('img').src;
  const pet = { info: petInfo, image: petImage };

  let interestList = JSON.parse(localStorage.getItem('interestList')) || [];

  if (button.classList.contains('red')) {
      message.textContent = '관심 등록이 취소 되었습니다.';
      interestList = interestList.filter(item => item.info !== pet.info); // 관심 목록에서 제거
      localStorage.setItem('interestList', JSON.stringify(interestList));
  } else {
      message.textContent = '관심 등록이 되었습니다.';
      interestList.unshift(pet); // 관심 목록에 추가
      localStorage.setItem('interestList', JSON.stringify(interestList));
      addPetToList(pet, true);
  }

  message.style.display = 'block';
  setTimeout(() => {
      message.style.display = 'none';
  }, 1500);

  // 하트 색상 토글
  button.classList.toggle('red');
}

// 관심 목록에 새로운 애완동물을 추가하는 함수
function addPetToList(pet, isNew) {
  const petList = document.querySelector('.container'); // 관심 목록이 위치한 컨테이너
  const newPetCard = document.createElement('div');
  newPetCard.classList.add('pet-card');
  newPetCard.innerHTML = `
      <img src="${pet.image}" alt="관심있는 동물">
      <div class="pet-info">
          ${pet.info}
      </div>
      <button class="btn heart red" aria-label="Like">
          <i class="fas fa-heart"></i>
      </button>
      <div class="interest-message" style="display: none;">관심 등록이 되었습니다.</div>
  `;

  if (isNew) {
      petList.appendChild(newPetCard);
  }

  // 새로 추가된 카드에도 클릭 이벤트 리스너 추가
  newPetCard.querySelector('.btn.heart').addEventListener('click', function() {
      this.classList.toggle('liked');
      handleHeartClick(this);
  });
}