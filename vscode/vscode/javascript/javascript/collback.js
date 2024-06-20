//콜맥함수(collback)

// const { default: axios } = require("axios");

//이벤트 리스너(event listener) = 이벤트 콜백   = 이벤트핸들러
//js

//loda 이벤트에 대한 콜백함수
// window.onload = function(){

//     //click 이벤트에 대한 콜백함수
//     document.getElementById("btn").onclick = function(){
//         document.getElementById("result").innerHTML
//         document.getElementById("txt").ariaValueMax;
//     };

//     //click이벤트에 대한 콜백함수2
//     document.getElementById("btn").addEventListener('click', function(){
//         document.getElementById("result").innerHTML =
//         document.getElementById("txt").ariaValueMax;
// });
//     document.getElementById("btn").addEventListener('click', function(){
//         alert('버튼 눌림')
//     });
// };

//jquery
//load 이벤트 콜백
// $(Function(){
// //click 이벤트 콜백
//     $("#btn").click(function(){
//         console.log('1');
//     });

//     $("#btn").click(function(){
//         $("#result").html($("#txt").val());
//     });
    
//     $("#btn").on("click", function(){
//        console.log('2');
//     });
// });

//ajax 콜백함수 
/*window.onload = function(){
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
xhr.send();

//readystatechange 이벤트 콜백 함수
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            document.getElementById("result").innerHTML
                = xhr.responseText;
        }
    };
//addEventListener 방식    
xhr.addEventListener('readystatechange',function(){
    if(xhr.readyState==4 && xhr.status==200){
        alert(xhr.responseText);
    }
});
};

$(document.)
//ajax 콜백함수 
window.onload = function(){
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
xhr.send();

//readystatechange 이벤트 콜백 함수
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            document.getElementById("result").innerHTML
                = xhr.responseText;
        }
    };
//addEventListener 방식    
xhr.addEventListener('readystatechange',function(){
    if(xhr.readyState==4 && xhr.status==200){
        alert(xhr.responseText);
    }
});
};*/

//jquery방법 1
// $(Function(){
//     $.ajax({
//         method:'get',
//         URL: 'https://jsonplaceholder.typicode.com/posts',
//         success: function(result){
//             $("#result").html(JSON.stringify(result));
//         }
//     });
// });


//jquery방법 2
// $(Function(){
//     $.ajax({
//         method:'get',
//         URL: 'https://jsonplaceholder.typicode.com/posts',
//     }).done(function(result){
//         $("#result").html(JSON.stringify(result));
//     }).fail(function(err){
//         console.log(err);
//     });
// });

//3. axios
// axios
//     .get('https://jsonplaceholder.typicode.com/posts')
//     .then(function(response){
//         $("#result").html(JSON.stringify(response));
//     })
//     .catch(function(error){
//         console.log(error);
//     })
//     .finally(function(){

//     });

// timing function
// setTimeout: 특정 시간 후에 콜백 수정
// setInterval: 특정 시간 간격으로 콜백 수행

//1) setTimeout(callback, milliseconds)
// $(function(){
//     setTimeout(cbfunc, 3000);
// });
// const cbfunc = function(){
//     console.log(alert("cbfunc수행!"));
// };

//1) setInterval(callback, milliseconds)
// let count = 0;
// const timer = null;
// $(function(){
//     timer = setInterval(cbfunc, 1000);
// });
// const cbfunc = function(){
//     console.log(`alert cbfunc ${++count} 수행!`);
//     if(count == 5){
//         clearInterval(timer);
//     }
// };

//실습 타이머 멈추기 버튼 누르면 타이머 멈추도록 수정
// let count = 0;
// const timer = null;
//     $(function(){
//         timer = setInterval(cbfunc, 1000);
//         $("#stop").on("click", function(){
//             clearInterval(timer);
//         });
//         $("#start").on("click", function(){
//             timer = setInterval(cbfunc, 1000);
//         });
// });
// const cbfunc = function(){
//     console.log(`alert cbfunc ${++count} 수행!`);
// };

