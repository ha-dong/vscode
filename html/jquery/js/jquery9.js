$(function(){

    console.log($("#child1").parent().attr("id"));

    console.log($("#ul1").parent());
    
    console.log($("#ul1").parents("div").attr("id"));
    
    console.log($("#ul1").parentsUntil("body").attr("id"));

    console.log($("#ul1").children());
    
    console.log($("#parent").children("div"));

    console.log($("#parent").find("*"));

    console.log($("#child1").siblings());

    console.log($("#child1").next());

    console.log($("#child1").nextAll());

    console.log($("#child2").prev());

    console.log($("#child3").prevAll());

    console.log($("div div div").first());

    console.log($("div div div").last());

    console.log($("div div div").eq(0));
    console.log($("div div div").eq(1));
    console.log($("div div div").eq(2));

    console.log($("div").fliter("#child1"));
    console.log($("div").not("#child1"));

});