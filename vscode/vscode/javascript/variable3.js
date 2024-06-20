//변수의 스코프 (Scope = 참조범위 = 유효범위)

//전역 스코프(global scope)
let global = "global"; //파일에 전역에서 사용 가능
var global_var = "global_var"; //전역 변수

//2.블록 스코프(block scope)
{
    let block = "block";//블록 밖에서는 block변수 참조 불가
    var block_var = "block_var"; //전역 스코프 변수
}

//3.함수 스코프 (function scope)
function func(a, b){
    var func_var = "func_var";
    let sum = a + b; //함수 밖에서는 sum 참조 불가
    return sum; //함수 밖에서는 sum 참조 불가, 함수 스코프 변수
}

console.log(global);
console.log(global_var);
//console.log(block);
console.log(block_var);
//console.log(func_var);
//console.log(sum);


//var로 선언하면 블록스코프를 가지지 않고 전역 스코프를 가진다.
