let timer = null;
let dTop = 265;
let dLeft = 265;
let dSpeed = 1;

$(function() {
    $("#moveToTop").on('click', function() {
        pause();
        timer = setInterval(moveToTop, 5)
    });

    $("#moveToBottom").on('click', function() {
        pause();
        timer = setInterval(moveToBottom, 5)
    });

    $("#pause").on('click', function() {
        pause();
    });
    $("#moveToLeft").on('click', function() {
        pause();
        timer = setInterval(moveToLeft, 5)
    });

    $("#moveToRight").on('click', function() {
        pause();
        timer = setInterval(moveToRight, 5)
    });
    
    $("body").on("keydown", function(event) {
        if (event.keyCode==37) moveToLeft();
        if (event.keyCode==38) moveToTop();
        if (event.keyCode==39) moveToRight();
        if (event.keyCode==40) moveToBottom();
        if (event.keyCode==37 && event.keyCode==38) {
            moveToLeft();
            moveToTop();
        }
        if (event.keyCode==37 && event.keyCode==40) {
            moveToLeft();
            moveToBottom();
        }
        if (event.keyCode==39 && event.keyCode==38) {
            moveToRight();
            moveToTop();
        }
        if (event.keyCode==39 && event.keyCode==40) {
            moveToRight();
            moveToBottom();
        }                                
    });

    $("#accel").on("click", function() {
        dSpeed++;
        $("#accel").val("속도:"+dSpeed);
    });    

});

const moveToTop = function() {
    if (dTop >= 10) {
        console.log("dTop:" + dTop);
        dTop -= dSpeed;
        $("dog").css("top", dTop+"px");
    }
};

const moveToBottom = function() {
    if (dTop <= 540) {
        console.log("dTop:" + dTop);
        dTop += dSpeed;
        $("#dog").css("top", dTop+"px");
    }
};

const pause = function() {
    clearInterval(timer);
};

const moveToLeft = function() {
    if (dLeft >= 10) {
        console.log("dLeft:" + dLeft);
        dLeft -= dSpeed;
        $("#dog").css("left", dLeft+"px");
    }
};

const moveToRight = function() {
    if (dLeft <= 540) {
        console.log("dLeft:" + dLeft);
        dLeft += dSpeed;
        $("dog").css("left", dLeft+"px");
    }
};

//콜백을 사용해서 중복을 줄인 코드
// let timer = null;
// let ballTop = 265;
// let ballLeft = 265;
// let ballSpeed = 1;

// $(function() {

//     $("#accel").val("속도:"+ballSpeed);

//     makeTimer("moveToTop", move("top"));
//     makeTimer("moveToBottom", move("bottom"));
//     makeTimer("moveToLeft", move("left"));
//     makeTimer("moveToRight", move("right"));

//     $("#pause").on("click", function() {
//         pause();
//     });    

//     $("body").on("keydown", function(event) {
//         if (event.keyCode==37) move("left")();
//         if (event.keyCode==38) move("top")();
//         if (event.keyCode==39) move("right")();
//         if (event.keyCode==40) move("bottom")();
//         if (event.keyCode==37 && event.keyCode==38) {
//             move("left")();
//             move("top")();
//         }
//         if (event.keyCode==37 && event.keyCode==40) {
//             move("left")();
//             move("bottom")();
//         }
//         if (event.keyCode==39 && event.keyCode==38) {
//             move("right")();
//             move("top")();
//         }
//         if (event.keyCode==39 && event.keyCode==40) {
//             move("right")();
//             move("bottom")();
//         }                                
//     });

//     $("#accel").on("click", function() {
//         ballSpeed++;
//         $("#accel").val("속도:"+ballSpeed);
//     });    

// });

// const makeTimer = function(id, f) {
//     $("#"+id).on("click", function() {
//         pause();
//         timer = setInterval(f, 5);
//     });
// };

// const pause = function() {
//     clearInterval(timer);
// };

// const move = function(direction) {
//     const max = 540;
//     const min = 10;
//     let ballDir = null;
//     let displ = 0;
//     switch (direction) {
//         case "top":     ballDir = ballTop;  displ = min;    break;
//         case "bottom":  ballDir = ballTop;  displ = max;    
//                         direction = "top";  break;
//         case "left":    ballDir = ballLeft; displ = min;    break;
//         case "right":   ballDir = ballLeft; displ = max;
//                         direction = "left";  break;
//     }
//     if (direction=="top" || direction=="left") {
//         return function() {
//             if (ballDir >= displ) {
//                 ballDir -= ballSpeed;
//                 $("#ball").css(direction, ballDir+"px");
//             }
//         };
//     } else {
//         return function() {
//             if (ballDir <= displ) {
//                 ballDir += ballSpeed;
//                 $("#ball").css(direction, ballDir+"px");
//             }
//         };        
//     }
    
// }