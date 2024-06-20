//객체(Object)

// 객체 생성법

// 1. 객체리티럴
// 프라퍼티명에 기호가 있으면 ''또는  ""로 묶어줘야 함
const Obj1 = {
    name: '홍길동',
    age : 20,
    firstname: "kildong",
    lastname: 'hong'
};

console.log(Obj1.name);
console.log(Obj1.age);
//프라퍼티명에 기호가 있으면 []로 접근해야 함
console.log(Obj1["firstname"]);
console.log(Obj1["lastname"]);

// 2. Object 생성자 함수
const obj2 = new Object();
obj2.name = "홍길동";
obj2.age = "20";
obj2['first_name'] = 'kildong';
obj2['last_name'] = 'hong';

console.log(obj2.name);
console.log(obj2.age);
console.log(obj2['first_name']);
console.log(obj2["last_name"]);

//3. 생성자 함수
function Person(name, age){
    this.name = name;
    this.age = age;
    this.getName = function(){
        return this.name;
    },
    this.getAge = function() {
        return this.age;
    };
}
const person = new Person("홍길동", 20);
console.log(person.getName());
console.log(person.getAge());