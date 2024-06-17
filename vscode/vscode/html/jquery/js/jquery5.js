$(function(){

    $("#btn1").click(function(){
        $("#div1").hide();
    });

//dom방식
    // document.getElementById("btn1").addEventListener("click", function(){
    //     document.getElementById("div1").style.display = "none";
    // });


    $("#btn2").click(function(){
        $("#div1").show();
    });

//dom방식
// document.getElementById("btn2").addEventListener("click", function(){
//     document.getElementById("div1").style.display = "block";
// });

    $("#btn3").click(function(){
        $("#div1").toggle();
    });

    $("#btn4").click(function(){
        $("#div1").fadeIn(2000);
    });

    $("#btn5").click(function(){
        $("#div1").fadeOut(2000);
    });

    $("#btn6").click(function(){
        $("#div1").fadeToggle(2000);
    });

    $("#btn7").click(function(){
        $("#div1").slideDown(2000);
    });

    $("#btn8").click(function(){
        $("#div1").slideUp(2000);
    });

    $("#btn9").click(function(){
        $("#div1").slideToggle(2000);
    });

    $("#btn10").click(function(){
        $("#div1").animate({
            width:"250px",
            height: "250px",
            borderWidth: "5px",
            borderHeight: "30px"});
    }, "5000");

    $("#btn11").click(function(){
        $("#div1").fadeOut(1000).fadeIn(500).slideUp(2000).slideDown(1000)
            .animate({width: "+=200px", height:"+=100px"});
    });

    $("#btn12").click(function(){

        $("#div1").fadeOut(2000, function(){
            alert("fanction 완료");
        });//div
    });//btn12

    $("#btn13").click(function(){
        $("#div1").fadeOut(5000).fadeIn(2000).slideDown(2000).slideDown(2000);
    });

    $("#btn14").click(function(){
        //첫 번째 true: 모든 이펙트 중지
        //두 번째 true: 현재 모든 이펙트는 끝까지 실행하고 중지
        $("#div1").stop(false, true);
    });
});