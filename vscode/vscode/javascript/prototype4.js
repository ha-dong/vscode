//0624(월)
//Object.prototype

const person={
    name: '홍길동'
};

//객체의 생성자 함수
console.log(person.constructor);

//객체가 가진 프라퍼티 조사
console.log(person.hasOwnProperty('name'));

//프로토타입 확인
console.log(Object.prototype.isPrototypeOf(person));

//프라퍼티 열거가능 여부 확인
console.log(person.propertyIsEnumerable('name'));

//객체의 문자열표현 확인
console.log(Object.toString(person));
// console.log(Object.toLocalString(person));

//typeof 연산자(객체의 타입을 확인)
console.log(typeof person);

//instanceof 연산자 (상속 여부 확인)
console.log(person instanceof Object);

//프로토타입 체인(프로토타입 연결)
const kang={
    name: '강감찬'
};

if(Object.prototype == kang.__proto__){
    console.log("kang은 Object를 상속받음")
}

function Person(name, age){
    this.name = name;
    this.age = age;
}
const person1 = new Person('홍길동', 20);

// person1은 person 상속
console.log(person1.__proto__ == Person.prototype);

//Person은 Function 상속
console.log(person.__proto__ == Function.prototype); //Function.prototyped 얘는 Object 자식

//person1은 Person을 상속, Person은 Function을 상속
//person1 - Person - Function 프로토타입 체인

// Function은 Object를 상속받지 않음
console.log(Function.__proto__ == Object.prototype);
console.log(typeof Function);
console.log(typeof Object);

//in연산자: 객체에 프라퍼티 존재 여부 확인
console.log(name in person1);

//Object.keys/values/entries
person1.age= 30;
person1.gender= '여';

console.log(Object.keys(person1));
console.log(Object.values(person1));
console.log(Object.entries(person1));

//실습: foreach 고차함수와 화살표함수 사용해서 person1의 프라퍼티를 나열
//형식 name: 유관순 age:30 gender: 여

//forEach: 배열들이 들어오면 하나씩 처리해줌
Object.entries(person1).forEach(
    ([key, values]) => console.log(key+':'+value+' '));

// console.log(window);
console.log(global);
console.log(globalThis);
console.log(global===globalThis);

    