// 관심목록에 추가될 동물 데이터를 관리할 배열
let favoriteAnimals = JSON.parse(localStorage.getItem('favoriteAnimals')) || [];

// 모달 창 제어 요소
const modal = document.getElementById("animal-modal");
const closeBtn = modal ? modal.querySelector(".close-btn") : null;
let currentAnimal = null; // 현재 모달에 표시된 동물 정보 저장

// 동물 프로필 클릭 시 모달 창 열기
const animalItems = document.querySelectorAll(".animal-item");

animalItems.forEach((item) => {
    item.addEventListener("click", () => {
        const animalImage = item.querySelector('img').src;
        const animalName = item.querySelector('p').textContent.split('\n')[0];
        const animalDetails = item.querySelector('p').textContent;

        // 모달 창 내부의 이미지와 텍스트 업데이트
        if (modal) {
            modal.querySelector('img').src = animalImage;
            modal.querySelector('h2').textContent = animalName;
            modal.querySelector('p').innerHTML = animalDetails.replace(/\n/g, '<br>');

            // 현재 동물 정보 저장
            currentAnimal = {
                imageSrc: animalImage,
                name: animalName,
                details: animalDetails.replace(/\n/g, '<br>')
            };

            // 버튼 상태 업데이트
            updateFavoriteButton();

            // 모달 창 표시
            modal.style.display = "block";
        }
    });
});

// 모달 창 닫기 버튼
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

// 모달 창 내 관심 등록/해제 버튼 동작
const favoriteModalBtn = document.getElementById("add-favorite");

if (favoriteModalBtn) {
    favoriteModalBtn.addEventListener("click", () => {
        const index = favoriteAnimals.findIndex(animal => animal.name === currentAnimal.name);
        if (index > -1) {
            // 이미 등록된 경우 -> 해제
            favoriteAnimals.splice(index, 1);
            localStorage.setItem('favoriteAnimals', JSON.stringify(favoriteAnimals));
            alert("관심등록이 해제되었습니다.");
            favoriteModalBtn.textContent = "관심등록";
        } else {
            // 등록되지 않은 경우 -> 등록
            favoriteAnimals.push(currentAnimal);
            localStorage.setItem('favoriteAnimals', JSON.stringify(favoriteAnimals));
            alert("관심등록이 완료되었습니다.");
            favoriteModalBtn.textContent = "관심해제";
        }

        // 하트 아이콘 상태 업데이트
        updateHeartIcon(currentAnimal.name);
    });
}

// 하트 클릭 시 관심목록에 추가 및 해제
const favoriteBtns = document.querySelectorAll(".favorite-btn");

favoriteBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.stopPropagation(); // 모달이 열리지 않도록 이벤트 전파 막기

        const animalItem = btn.closest('.animal-item');
        const animalData = {
            imageSrc: animalItem.querySelector('img').src,
            name: animalItem.querySelector('p').textContent.split('\n')[0],
            details: animalItem.querySelector('p').textContent.replace(/\n/g, '<br>'),
        };

        const index = favoriteAnimals.findIndex(animal => animal.name === animalData.name);
        if (index > -1) {
            // 이미 등록된 경우 -> 해제
            favoriteAnimals.splice(index, 1);
            btn.classList.remove('full');
            btn.classList.add('empty');
            alert("관심등록이 해제되었습니다.");
        } else {
            // 등록되지 않은 경우 -> 등록
            favoriteAnimals.push(animalData);
            btn.classList.remove('empty');
            btn.classList.add('full');
            alert("관심등록이 완료되었습니다.");
        }

        // 로컬스토리지에 저장
        localStorage.setItem('favoriteAnimals', JSON.stringify(favoriteAnimals));
    });

    // 초기 하트 상태 설정
    const animalName = btn.closest('.animal-item').querySelector('p').textContent.split('\n')[0];
    if (favoriteAnimals.some(animal => animal.name === animalName)) {
        btn.classList.add('full');
    } else {
        btn.classList.add('empty');
    }
});

// 관심목록 페이지로 이동할 때 로컬스토리지에서 데이터 불러오기
const favoriteListBtn = document.getElementById("favorite-list-btn");

if (favoriteListBtn) {
    favoriteListBtn.addEventListener("click", () => {
        window.location.href = "../html/favorites.html";
    });
}

// 검색 기능 구현
const searchBtn = document.getElementById("search-btn");

if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        const searchInput = document.getElementById("search-input").value.toLowerCase();
        const filteredAnimals = Array.from(animalItems).filter(item => {
            const animalCity = item.querySelector('p').textContent.toLowerCase();
            return animalCity.includes(searchInput);
        });

        animalItems.forEach(item => {
            item.style.display = "none"; // 모두 숨기기
        });

        filteredAnimals.forEach(item => {
            item.style.display = "block"; // 검색 결과만 보이기
        });
    });
}

// 관심목록 페이지에서 로컬스토리지에서 데이터 불러오기
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('favorites.html')) {
        const savedFavorites = JSON.parse(localStorage.getItem('favoriteAnimals')) || [];
        const favoriteList = document.querySelector('.animal-list');

        savedFavorites.forEach(animal => {
            const animalItem = document.createElement('div');
            animalItem.classList.add('favorite-list-item');
            animalItem.innerHTML = `
                <img src="${animal.imageSrc}" alt="동물 이미지">
                <div class="details">
                    <p>${animal.name}</p>
                    <p>${animal.details}</p>
                </div>
                <button class="favorite-btn full">♥</button>
            `;

            // 관심 해체 기능 추가
            const favoriteBtn = animalItem.querySelector('.favorite-btn');
            favoriteBtn.addEventListener('click', () => {
                const index = favoriteAnimals.findIndex(favAnimal => favAnimal.name === animal.name);
                if (index > -1) {
                    favoriteAnimals.splice(index, 1);
                    localStorage.setItem('favoriteAnimals', JSON.stringify(favoriteAnimals));
                    animalItem.remove();
                    alert('관심등록이 해제되었습니다.');
                }
            });

            favoriteList.appendChild(animalItem);
        });
    }
});

// 모달 창 내 버튼 상태 업데이트
function updateFavoriteButton() {
    if (favoriteAnimals.some(animal => animal.name === currentAnimal.name)) {
        favoriteModalBtn.textContent = "관심해제";
    } else {
        favoriteModalBtn.textContent = "관심등록";
    }
}

// 하트 아이콘 상태 업데이트
function updateHeartIcon(animalName) {
    favoriteBtns.forEach(btn => {
        const btnAnimalName = btn.closest('.animal-item').querySelector('p').textContent.split('\n')[0];
        if (btnAnimalName === animalName) {
            if (favoriteAnimals.some(animal => animal.name === animalName)) {
                btn.classList.add('full');
                btn.classList.remove('empty');
            } else {
                btn.classList.add('empty');
                btn.classList.remove('full');
            }
        }
    });
}

    // 채팅 버튼 클릭 시 채팅 페이지로 이동
    const chatButton = document.getElementById('chat-btn');
    if (chatButton) {
        chatButton.addEventListener('click', function () {
            window.location.href = '../html/chatting.html'; // 수정된 경로
        });
    }
    
    
    

