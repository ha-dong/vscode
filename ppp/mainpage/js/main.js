// 로그인 상태 관리 (예: true 또는 false로 설정)
let isLoggedIn = false; // 기본적으로 비회원 상태로 설정

// 관심목록에 추가될 동물 데이터를 관리할 배열
let favoriteAnimals = JSON.parse(localStorage.getItem('favoriteAnimals')) || [];

// 모달 창 제어 요소
const modal = document.getElementById("animal-modal");
const closeBtn = modal ? modal.querySelector(".close-btn") : null;
let currentAnimal = null; // 현재 모달에 표시된 동물 정보 저장

// 페이지가 main.html 또는 main1.html일 때만 스크립트 실행
if (window.location.pathname.endsWith('main.html') || window.location.pathname.endsWith('main1.html')) {
    // 동물 프로필 클릭 시 모달 창 열기
    const animalItems = document.querySelectorAll(".animal-item");

    animalItems.forEach((item) => {
        item.addEventListener("click", () => {
            if (!isLoggedIn && window.location.pathname.endsWith('main.html')) {
                alert("비회원 시 동물 사진을 클릭할 수 없습니다. 로그인 후 다시 시도해 주세요.");
                return;
            }

            const animalImage = item.querySelector('img').src;
            const animalDetails = item.querySelector('p').textContent;
            const animalName = animalDetails.split('\n')[0];

            // 모달 창 내부의 이미지와 텍스트 업데이트
            if (modal) {
                modal.querySelector('img').src = animalImage;
                modal.querySelector('h2').textContent = animalName;
                modal.querySelector('p').innerHTML = formatAnimalDetails(animalDetails);

                // 현재 동물 정보 저장
                currentAnimal = {
                    imageSrc: animalImage,
                    name: animalName,
                    details: formatAnimalDetails(animalDetails)
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
            if (!isLoggedIn && window.location.pathname.endsWith('main.html')) {
                alert("비회원 시 관심 등록/해제를 할 수 없습니다. 로그인 후 다시 시도해 주세요.");
                return;
            }

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

            if (!isLoggedIn && window.location.pathname.endsWith('main.html')) {
                alert("비회원 시 관심 등록/해제를 할 수 없습니다. 로그인 후 다시 시도해 주세요.");
                return;
            }

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
            if (!isLoggedIn && window.location.pathname.endsWith('main.html')) {
                alert("비회원 시 관심목록을 볼 수 있습니다. 로그인 후 다시 시도해 주세요.");
                return;
            }
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
        if (!currentAnimal || !favoriteModalBtn) return;

        const isFavorited = favoriteAnimals.some(animal => animal.name === currentAnimal.name);
        favoriteModalBtn.textContent = isFavorited ? "관심해제" : "관심등록";
    }

    // 하트 아이콘 상태 업데이트
    function updateHeartIcon(animalName) {
        const heartBtn = Array.from(favoriteBtns).find(btn =>
            btn.closest('.animal-item').querySelector('p').textContent.split('\n')[0] === animalName
        );

        if (heartBtn) {
            if (favoriteAnimals.some(animal => animal.name === animalName)) {
                heartBtn.classList.remove('empty');
                heartBtn.classList.add('full');
            } else {
                heartBtn.classList.remove('full');
                heartBtn.classList.add('empty');
            }
        }
    }

    // 내 정보 버튼 클릭 시 내 정보로 이동
    const myInfoBtn = document.getElementById('my-info-btn');
    if (myInfoBtn) {
        myInfoBtn.addEventListener('click', () => {
            if (!isLoggedIn && window.location.pathname.endsWith('main.html')) {
                alert("비회원 시 내 정보를 확인할 수 없습니다. 로그인 후 다시 시도해 주세요.");
                return;
            }
            window.location.href = '../html/Mypage.html'; // 수정된 경로
        });
    }

    // 정보 페이지 버튼 클릭 시 안내 메시지 표시
    const infoBtns = document.querySelectorAll('.info-btn'); // 모든 정보 버튼 클래스

    infoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!isLoggedIn && window.location.pathname.endsWith('main.html')) {
                alert("비회원 시 이 기능을 사용할 수 없습니다. 로그인 후 다시 시도해 주세요.");
                return;
            }

            // 버튼에 따라 다른 페이지로 이동할 수 있습니다.
            switch (btn.id) {
                case 'site-intro-btn':
                    window.location.href = '../html/site-intro.html';
                    break;
                case 'terms-btn':
                    window.location.href = '../html/terms.html';
                    break;
                case 'contact-btn':
                    window.location.href = '../html/contact.html';
                    break;
            }
        });
    });

    // 페이지 로드 시 버튼 상태 설정
    document.addEventListener('DOMContentLoaded', () => {
        const buttons = document.querySelectorAll('button');

        buttons.forEach(btn => {
            if (window.location.pathname.endsWith('main.html') && !isLoggedIn) {
                // main.html에서 비회원 상태에서는 모든 버튼 클릭 시 막음
                btn.addEventListener('click', () => {
                    alert("비회원 시 이용할 수 없습니다. 로그인 후 다시 시도해 주세요.");
                });
            }
        });
    });

    // 채팅하기 버튼 클릭 시 채팅 페이지로 이동
    const chatBtn = document.getElementById('chat-btn');

    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            if (!isLoggedIn && window.location.pathname.endsWith('main.html')) {
                alert("비회원 시 채팅 기능을 이용할 수 없습니다. 로그인 후 다시 시도해 주세요.");
                return;
            }
            window.location.href = '../html/chat.html'; // 채팅 페이지로 이동
        });
    }
}

// 동물 상세정보를 포맷팅하는 함수 (변경 없음)
function formatAnimalDetails(details) {
    // 각 정보 항목을 세로로 정렬하기 위해 split로 나누고 <p>로 감싸줍니다.
    const [name, age, height, weight, breed, type, ...additionalInfo] = details.split('\n');
    const additionalDetails = additionalInfo.join('<br>');

    return `
        <p><strong>나이:</strong> ${age}</p>
        <p><strong>키:</strong> ${height}</p>
        <p><strong>무게:</strong> ${weight}</p>
        <p><strong>품종:</strong> ${breed}</p>
        <p><strong>종류:</strong> ${type}</p>
        <p>${additionalDetails}</p>
    `;
}


// 채팅하기 버튼 클릭 시 채팅 페이지로 이동
const chatBtn = document.getElementById('chat-btn');

if (chatBtn) {
    chatBtn.addEventListener('click', () => {
        if (!isLoggedIn && window.location.pathname.endsWith('main.html')) {
            alert("비회원 시 채팅 기능을 이용할 수 없습니다. 로그인 후 다시 시도해 주세요.");
            return;
        }
        window.location.href = '../html/chatting.html'; // 채팅 페이지로 이동
    });
}

