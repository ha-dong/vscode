//기본타입, 참조타입 복사

//기본타입 복사
let message = "hello";
let message_cp = message;

console.log(message);
console.log(message_cp);

message_cp="Hi";
console.log(message);   //hello
console.log(message_cp);    //hi

//참조타입 복사
//참조 값만 복사됨
const hong = {name: "홍길동"};
const hong_cp = hong;
console.log(hong.name);
console.log(hong_cp.name);

hong_cp.name="강감찬";
console.log(hong.name);//강감찬
console.log(hong_cp.name);//강감찬

let a = {};
let b = a;
console.log(a==b); //true
console.log(a==b); //ture

//a와 b가 가이키는 객체가 다른 객체
let a2 = {};
let b2 = {};
console.log(a2==b2); //false
console.log(a2==b2); //false

//shallow copy, .객체 복제, 객체 2개
//object.assign(빈객체, 복사할 객체);
let user={
    name: "유관순",
    age: 30
};

let user_clone = Object.assign({}, user);
user_clone.name="이순신";
console.log(user.name);
console.log(user_clone.name);
console.log(user==user_clone);//false
console.log(user===user_clone);//false

//deep copy
const lodash = require("lodash")
var objects = [{'a':1}, {'b':2}];

var shallow = _.clone(objects);
console.log(shallow[0]===objects[0]);

//loadash를 활용한 deep copy
//http://loadash.com
var_= require('loadash');
    var objects =[
        {'a':1},
        {'b':2}
    ];
var shallow = _.cloneDeep(objects);
console.log(shallow===objects);