//0625(화)
//전역 객체

// 웹브라우저 환경에서 전역객체는 window
// node 환경에서 전역객체는 global 또는 globalThis

//웹브라우저 환경에서
/*
console.log(window);

let x = 10;
console.log(window.x);//undefined

var y = 10;
console.log(Window.y);//10*/

//node환경에서
console.log(global);
console.log(globalThis);
console.log(global===globalThis);

let a =10;
var b =10;
console.log("----------");
//a는 global의 프라퍼티가 아니라
//global이 가지고 있는 객체의 프라퍼티가 된다.
console.log(global.a);
console.log(global.b);
console.log("----------");
console.log(globalThis.a);
console.log(globalThis.b);
