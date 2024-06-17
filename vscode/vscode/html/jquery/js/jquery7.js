$(function(){
    $("#a1").attr("href", "http://www.naver.com");
    $("#a1").attr("href", "http://www.daum.net");
    $("#a1").text("네이트");
    console.log($("#a1").attr("href"));

    $("#content").propend("[prepend]");
    $("#content").propend("[apend]");
    $("#content").propend("[before]");
    $("#content").propend("[after]");

    $("#empty").click(function(){
        $("u1").empty();
    });

    $("#removety").click(function(){
        $("u1").remove();
    });

    $("#btnc1add").click(function(){$("txt2").addClass("class1")});
    $("#btnc1remove").click(function(){$("txt2").removeClass("class1")});
    $("#btnc1toggle").click(function(){$("txt2").toggleClass("class1")});
    $("#btnc2add").click(function(){$("txt2").addClass("class2")});
    $("#btnc2remove").click(function(){$("txt2").removeClass("class2")});
    $("#btnc2toggle").click(function(){$("txt2").toggleClass("class2")});

    $("#txt2").css({
        backgroundColor: "megenta",
        fontSize: "50px"});

    console.log($("#txt2").css("font-size"));
    
});