document.getElementById('dropdownButton').addEventListener('click', function() {
  const menu = document.getElementById('dropdownMenu');
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
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
                message.textContent = '관심 등록이 취소 되었습니다.';
            } else {
                message.textContent = '관심 등록이 되었어요.';
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