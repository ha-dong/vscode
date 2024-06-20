//데이터 타입 (data type)


// 1. 숫자 (number)
const num1 = 100;
const num2 = 0b0001;
const num3 = 0o777;
const num4 = 0xFBFF;
const num5 = Infinity;
const num6 = -Infinity;
const num7 = NaN;

console.log(typeof num1);
console.log(typeof num2);
console.log(typeof num3);
console.log(typeof num4);
console.log(typeof num5);
console.log(typeof num6);
console.log(typeof num7);

//2.문자열 (String)
const str1 = "hello";
const str2 = 'hello';
const str3 = 'hello';
const str4 = 'hello';
const str5 = 'javascript';
const str6 = '${str4} ${str5}';

console.log(typeof str1);
console.log(typeof str2);
console.log(typeof str3);
console.log(typeof str4);
console.log(typeof str5);
console.log(typeof str6);

// 3. 블리언(boolean)
const bool1 = true;
const bool2 = false;
console.log(typeof bool1, typeof bool2);

//4.undefined
//초기화 되지 않았다는 값
//undefined는 타입이기도 하고 유일한 값이기도 하다.
var v; //engine
let l; //engine
const c = undefined; //developer
console.log(v, typeof v);
console.log(l, typeof l);
console.log(c, typeof c);

//5.null
//값이 없다는 값, 타입이기도 하고 유일한 값이기도 하다.
var v1 = null; //null로 초기화 됨 = 초기화 되었는데 값
var l1 = null;
const c1 = null;

console.log(v1, typeof v1);//object
console.log(l1, typeof l1);
console.log(c1, typeof c1);

//동적 타이핑(Dynamic Typing)
//변수에 값이 할당될 때 변수의 타입이 강해짐
let vv = 100; //number
console.log(typeof vv);
vv= 'hello';//string

console.log(typeof vv);
vv = false;//boolean

console.log(typeof vv);

vv = function(){
    console.log('hello');
};
console.log(typeof vv);
vv = [1, 2, 3];
console.log(typeof vv);

vv={name:'홍길동', age:30};
console.log(typeof vv);

vv= /abc/g;
console.log(typeof vv);

//instanceOf 연산자 : 객체가 클래스의 인스턴스인지 여부
const vvv = new RegExp();
console.log(typeof vvv);
console.log(vvv instanceof RegExp);

//object, Array, function, RegExp객체와 리터럴
//리터럴 표기법으로 코딩을 화면 내부에서 객체생성자 표기법으로 자동변환 되어 실행

const obj1 = new Object();//객체 생성자 표기법
const obj2 = {};//리터럴 표기법
const arr1 = new Array();
const arr2 = [];
const func1 = new function();
const func2 = function(){};
const re1 = new RegExp();//객체 생성자 표기법
const re2 = /abc/; //리티컬 표기법

console.log(typeof new Object());
console.log(typeof {});