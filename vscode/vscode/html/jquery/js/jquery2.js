$(function(){
    $("*").css("background-color","orange");//전체 선택자(전체 엘리먼트)
    $("ul1").css("font-size", "30px");//id 선택자
    $(".first").css("font-weight", "bold");//class선택자
    $("ul li:first").css("color", "blue");//ul마다 첫 번째 자식선택자
    $("#ul2:first-child").css("color", "blue");//첫 번째 자식 선택자
    //속성 선택자
    $("[href]").css("font-style", "italic");
    $("a[href='http://wwwm.naver.com']").css("font-size", "5em");

    //버튼 선택자(<input type="button">&<>button)
    $(":button").css("border-width", "10px");
    $("input[type='button']").css("color", "yellow");
    $("button").css("color", "gray")

    //even(짝수), odd(홀수)
    $("tr:even").css("font-size", "20px");
    $("tr:odd").css("font-size", "30px");

    //메소드체이닝(메소드를 연결해서 순차적으로 수행)
    $("table")
        .css("background-color", "white")
        .css("border-width", "5px")
        .css("color", "red")
        .css("width", "50px");

    //다중 선택자
    $("li, a").css("font-decoration", "underline");
    
});
    