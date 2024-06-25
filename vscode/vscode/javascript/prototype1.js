//프로토 타입 (prototype)

//생성자 함수
function Person(name, age){
    this.name = name;
    this.age = age;
}

//생성자 함수를 통해 객체 생성
const person1 = new Person("홍길동", 20);

console.log("Person.prototype: " + Person.prototype);
console.log("person.__proto" + Person.__proto__);

//person 생성자 함수를 통해 만들어진 person 객체의 __proto__
//프라퍼티는 person.prototype을 가리키게 됨
console.log(Person.prototype === Person.__proto__);

//Person은 function을 상속 받는다.
console.log(Person instanceof Function);

//Person.prototype은 Object를 상속 받는다.
console.log(Person.prototype instanceof Function); //false
console.log(Person.prototype instanceof Object); //true

console.log(Person.prototype.__proto__ === Object.prototype);//true

// console.log(person.getName());//error

//property 프라퍼티를 통한 메소드 확장
Person.prototype.getName = function(){
    return this.name;
};

//prototype 프라퍼티를 통한 프라퍼티 확장
Person.prototype.gender = '남';

console.log(person.getName());
console.log(person.gender);