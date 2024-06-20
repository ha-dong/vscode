//함수(function)

//함수 선언문 rutime 이전에 메모리에 생성
function add(x, y) {
    return x+y;
}

console.log(add);
console.log(add()); //nan x, y를 정해주지 않아서 undefined가 되었고 그래서 nan이 나옴

console.log(add(3)); //nan x = 3, y=undefined
console.log(add(3, 5));
console.log(add(3, 5, 7));//뒤를 아무리 생성해도 8이 나옴

console.log(add('hello', 'javascript'));//hellojavascript

//함수 리터럴: 함수에 쓰여진 함수갑스 runtime에 메모리 생성
const func1 = function(){
    console.log("\nfunc1")
};
func1();
const func2 = function(){
    console.log("\nfunc2")
};
const func3 = function(f){
    f();
    console.log("\nfunc3")
};
func3(func2);//fun2 함수를 전다
func3(func2);
//func3(func2()); .func2 함수의 실행결과를 전달

const func4 = function a(){
    console.log('func4');
};
//a(); a라는 함수명은 엔진내부에서 사용
func4();

const func5 = function(a,b) {
    return  a+b;
};
console.log('\n', func5(3,5));

//함수리터럴을 이용해서 사칙연산을 수행하는 하나의 함수 만들기
const func6 = function(num1, num2, f){
    console.log(f(num1, num2));
    /*result(num1, num2);
    if (num1 + num2) {
        result=(num1+num2);
    }else if (num1 - num2) {
        result = (num1 - num2);
    }else if (num1 * num2){
        result = (num1*num2);
    }else(num1/num2){
        result=(num1/num2);
    }*/
};
func6(function(num1, num2){return num1+num2;}, 3,5);
func6(function(num1, num2){return num1-num2;}, 3,5);
func6(function(num1, num2){return num1*num2;}, 3,5);
func6(function(num1, num2){return num1/num2;}, 3,5);

//나머지 연산, a제곱과 b제곱의 합 연산
func6(function(num1, num2){return num1%num2;}, 3,5);
func6(function(num1, num2){return num1*num1 + num2 * num2;}, 3,5);

//화살표 함수 (arrow function)
const add2= (x,y) => x+y; //function(x,y){return x+y;}
console.log(add2(3,5));

const add3 = x => x * y; //function(x){return x*X;}
console.log(add3(3));

const afunc = (x, y) => {
    let f = x+y;
    return f;
};
console.log(afunc(3, 5));

//함수리터럴을 이용해서 사칙연산을 수행하는 하나의 함수 만들기
const func7 = (r, num1, num2) => console.log(r(num1, num2));
func7((num1, num2) => num1 + num2);
func7((num1, num2) => num1 - num2);
func7((num1, num2) => num1 * num2);
func7((num1, num2) => num1 / num2);

//나머지 연산, a제곱과 b제곱의 합 연산
func7(function(num1, num2){return num1%num2;}, 3,5);
func7(function(num1, num2){return num1*num1 + num2 * num2;}, 3,5);

//function 생성자 함수
const ffunc = new Function('x', 'y', 'return x * y');
console.log(ffunc);
console.log(ffunc(3, 5));

//paremeter, argumnet
//parameter(파리미터): 함수가 값을 전달받기 위해 선언한 함수의 지역변수
//atgument(인자): 함수의 파라미터에 전달되는 값

const pfunc = function (a, b) {//a,b는 파라미터이며 함수의 지역변수
    return a+b;
};
//4의 값이 a에 할당되면 a는 number타입이 됨
console.log(pfunc(4, 6));//4, 6은 인자

//arguments: 함수의 인자들의 배열
//caller: 호출한 함수
//callee: 호출된 함수
const argfunc = function (x, y) {
    console.log(argfunc.arguments);
    console.log(argfunc.arguments[0]);
    console.log(argfunc.arguments[1]);
}
argfunc(1, 2);

//실습 3
//함수의 파라미터의 수와 함수에 전달된 인자의 수가
//같지 않으면 메시지를 출력하고 함수를 실행하지 않는 함수를 생성
//함수의 파라미터의 수와 전달된 인자의 수가 같다면 모든 인자들을 다 더해서 반환하는 함수
const func10 = function(x, y, z){
    const argLeng = arguments.length;
    if(argLeng!=3){
        console.log("인자의 개수가 졸못되었습니다!");
        return false;
    }else{
        console.log(x+y+z);
    }
};
func10(1, 2);
func10(1, 2, 3);
func10(1, 2, 3, 4);

//스프레드 문법
//파라미터의 개수를 지정하기 곤란할 때 파라미터들을 배열로
const func11 = function(...args) {
    console.log(args.length);   //파라미터의 길이
    console.log(arguments.length); //인자의
};
func11(1, 2, 3);
