document.getElementById('dropdownMenuButton').addEventListener('click', function() {
    let dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.toggle('show');
  });
  
  // 클릭이 드롭다운 밖에서 발생하면 드롭다운을 닫기 위해 문서에 클릭 이벤트 리스너 추가
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown')) {
      document.querySelector('.dropdown-menu').classList.remove('show');
    }
  });
  