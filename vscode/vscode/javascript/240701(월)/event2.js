//240701(월)
// event 객체의 프라퍼티

document.querySelector("#btn").addEventListener("click", function(e){
    console.log("이벤트 타겟: " + e.target);
    console.log("이벤트 currentTarget: " + e.target);
    console.log("이벤트 타겟: " + e.eventPhase);
    console.log("이벤트 타겟: " + e.type);
});

document.querySelector("#btn").addEventListener("mouseover", function(e){
    console.log("이벤트 타겟: " + e.target);
    console.log("이벤트 currentTarget: " + e.target);
    console.log("이벤트 타겟: " + e.eventPhase);
    console.log("이벤트 타겟: " + e.type);
});

// 디폴트 이벤트 방지
document.querySelector("a").addEventListener("click", function(e){
    e.preventDefault();
});

// 폼내의 input엘리먼트에 입력된 값에 따라 submit을 수행
document.querySelector("form").addEventListener("submit", function(e){
    e.preventDefault();
    const txtValue = document.querySelector("#txt").value;
    if(txtValue && txtValue>5){
        this.submit();
    }else{
        alert("값을 5글자 이상 입력해 주세요");
        return false;
    }
});