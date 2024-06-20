//식별자(identifier)
//프로그래밍에서 사용하는 서로를 구분직는 유일한 이름
//ex) 변수명, 함수명, 객체명 ...

function func(){
    console.log("func");
}

let f = func;

f();

console.log(this);//전역객체
console.log(this.func);//전역객체
console.log(func());//표현식은 리터럴 값은 리터럴 func을 수행하고 결과를 가지고 옴(함수 실행 결과)

console.log(func);//function 전체를 가져옴(함수 자체)

//예약어(reserved word): function, let
//식별자(indentifier): func, console, log, f
//리터럴(literal): "func" function전체  function func(){console.log("func");}


//실습: 아래 코드레서 예약어, 식별자, 리터럴을 구분해 보세요
const c1 = 100;
const c2 = 200;
let l1 = c1 + c2;

function f1(a, b) {
    return a + b;
}

const f2 = function(a, b){
    return a + b;
}

console.log(f1(3,5));
console.log(f2(2,4));

//예약어 : const, let, function, //return
//식별자: c1, c2, l1, f1, f2, //a,b, consolem, log
//리터럴: function전체 'f1 수행결과: ', 'f2 수행결과: ', 35, 24 //100,200 functiob전체{}
//연산자: =, +, *, 