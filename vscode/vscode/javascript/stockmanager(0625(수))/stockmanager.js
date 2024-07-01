$(() => {

    // localStorage 초기화
    initLocalStorage();

    // 매장목록 출력
    printShopList();    

    // 이벤트핸들러 등록
    $('#shwriteBtn').on('click', () => {
        writeShop();
    });

});

// localStorage 초기화
const initLocalStorage = () => {
    if (localStorage) {
        if (!localStorage.getItem('shopSeq')) {
            localStorage.setItem('shopSeq', '0');
        }
        if (!localStorage.getItem('stockSeq')) {
            localStorage.setItem('stockSeq', '0');
        }                
        if (!localStorage.getItem('shopList')) {
            localStorage.setItem('shopList', '[]');
        }
        if (!localStorage.getItem('stockList')) {
            localStorage.setItem('stockList', '[]');
        }        
    }
};

// 매장등록
const writeShop = () => {
    const shopName = $('#shname').val().trim();
    if (shopName) {
        let shopList = JSON.parse(localStorage.getItem('shopList'));
        const newShop = {
            id: getNextShopSeq(),
            name: shopName,
            count: 0
        };
        shopList.push(newShop);
        localStorage.setItem('shopList', JSON.stringify(shopList));
        printShopList();
        $('#shname').val('');
    }
}

// 매장번호 시퀀스
const getNextShopSeq = () => {
    const nextShopSeq = Number(localStorage.getItem('shopSeq')) + 1;
    localStorage.setItem('shopSeq', nextShopSeq);
    return Number(nextShopSeq);
};

// 매장목록
const getShopList = () => {
    return JSON.parse(localStorage.getItem('shopList'))
            .sort((a, b) => b.shno - a.shno);
};

// 매장목록 출력
const printShopList = () => {
    let shopList = JSON.parse(localStorage.getItem('shopList'));
    const $tbody = $('#shoplist tbody');
    $tbody.empty();
    shopList.forEach((shop, index) => {
        const $tr = $(`
            <tr>
                <td>${shop.name}</td>
                <td>${shop.count}</td>
                <td><button onclick="editShop(${shop.id})">수정</button></td>
                <td><button onclick="deleteShop(${shop.id})">삭제</button></td>
            </tr>
        `);
        $tbody.append($tr);
    });
};

// 매장수정
const editShop = (id) => {
    let shopList = JSON.parse(localStorage.getItem('shopList'));
    const shop = shopList.find(s => s.id === id);
    const newName = prompt('새 매장명을 입력하세요', shop.name);
    if (newName) {
        shop.name = newName.trim();
        localStorage.setItem('shopList', JSON.stringify(shopList));
        printShopList();
    }
};


// 매장삭제
const deleteShop = (id) => {
    let shopList = JSON.parse(localStorage.getItem('shopList'));
    shopList = shopList.filter(s => s.id !== id);
    localStorage.setItem('shopList', JSON.stringify(shopList));
    printShopList();
};


// 재고번호 시퀀스
const getNextStockSeq = () => {
    let seq = parseInt(localStorage.getItem('stockSeq'), 10);
    localStorage.setItem('stockSeq', (seq + 1).toString());
    return seq;
};

// 재고등록
const writeStock = () => {
    const stockName = $('#stname').val().trim();
    const stockAmt = parseInt($('#stamt').val().trim(), 10);
    const stockInDate = $('#stindate').val();
    if (stockName && stockAmt && stockInDate) {
        let stockList = JSON.parse(localStorage.getItem('stockList'));
        const newStock = {
            id: getNextStockSeq(),
            name: stockName,
            amount: stockAmt,
            inDate: stockInDate,
            regDate: new Date().toISOString().split('T')[0]
        };
        stockList.push(newStock);
        localStorage.setItem('stockList', JSON.stringify(stockList));
        printStockList();
        $('#stname').val('');
        $('#stamt').val('');
        $('#stindate').val('');
    } else {
        alert('모든 필드를 올바르게 입력하세요.');
    }
};

// 재고목록 출력
const printStockList = () => {
    let stockList = JSON.parse(localStorage.getItem('stockList'));
    const $tbody = $('#stocklist tbody');
    $tbody.empty();
    stockList.forEach((stock) => {
        const $tr = $(`
            <tr>
                <td>${stock.name}</td>
                <td>${stock.amount}</td>
                <td>${stock.inDate}</td>
                <td>${stock.regDate}</td>
                <td><button onclick="editStock(${stock.id})">수정</button></td>
                <td><button onclick="deleteStock(${stock.id})">삭제</button></td>
            </tr>
        `);
        $tbody.append($tr);
    });
};

// 재고수정
const editStock = (id) => {
    let stockList = JSON.parse(localStorage.getItem('stockList'));
    const stock = stockList.find(s => s.id === id);
    const newName = prompt('새 재고 제품명을 입력하세요', stock.name);
    const newAmt = prompt('새 재고 수량을 입력하세요', stock.amount);
    if (newName && newAmt) {
        stock.name = newName.trim();
        stock.amount = parseInt(newAmt.trim(), 10);
        localStorage.setItem('stockList', JSON.stringify(stockList));
        printStockList();
    } else {
        alert('모든 필드를 올바르게 입력하세요.');
    }
};

// 재고삭제
const deleteStock = (id) => {
    let stockList = JSON.parse(localStorage.getItem('stockList'));
    stockList = stockList.filter(s => s.id !== id);
    localStorage.setItem('stockList', JSON.stringify(stockList));
    printStockList();
};

// 재고수량변경
const changeStockAmount = (id, newAmount) => {
    let stockList = JSON.parse(localStorage.getItem('stockList'));
    const stock = stockList.find(s => s.id === id);
    if (stock) {
        stock.amount = newAmount;
        localStorage.setItem('stockList', JSON.stringify(stockList));
        printStockList();
    } else {
        alert('재고를 찾을 수 없습니다.');
    }
};