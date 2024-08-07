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

    document.getElementById('heart').addEventListener('click', function() {
        this.classList.toggle('active'); // 클릭할 때 'active' 클래스 토글
    });

    $(document).ready(function() {
      // 하트 버튼 클릭 시 색상 변경
      $('.heart').click(function() {
          $(this).toggleClass('liked');
      });
  });
