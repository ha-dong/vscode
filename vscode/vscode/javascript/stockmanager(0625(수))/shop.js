/*class shop{
    constructor(shno, shname, shtotst){
        this.shno = shno; //매장번호
        this.shname = shname; //매장명
        this.shtotst = shtotst; //매장 총재고 수량
    }
}
    $(() => {
        printshopList();
        // 제목과 내용을 입력하고 등록 버튼 누르면
        // 메모 객체 생성해서 addList 호출
        $("#shwriteBtn ").click(function() {
            const shopObj = {
                title: $("#title").val(),
                content: $("#content").val()
            };
            addMemo(shopObj);
    
    });

    // li 클릭...
    $("#shname ul li").click(function() {
        console.log($(this).attr("id")); // id
        console.log($(this).attr("id").substr(4)); // index
    });

});

// localStorage의 리스트를 가져오는 함수
function getShno() {
    let shopList = localStorage.getItem("shno");
    if (shopList==null || shopList=="") {
        localStorage.setItem("shopList", "[]");
        return [];
    } else {
        return JSON.parse(shopList);
    }
}

// localStorage에 객체를 저장한다.
function addShop(shopObj) {
    const shopListArr = getshopList();
    shopListArr[shopListArr.length] = shopObj;
    localStorage.setItem("shopList", JSON.stringify(shopListArr));
    printShopList();
}

// localStorage의 리스트에서 삭제하는 함수
function removeShopList(shopList) {
}*/