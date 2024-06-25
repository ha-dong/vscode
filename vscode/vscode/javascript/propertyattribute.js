//javascript 객체의 프라퍼티들의 속성

const hong = {
    name: 'hong'
};

//name프라퍼티의 속성 객체
//{ value: 'hong', writable: true, enumerable: true, configurable: true }
console.log(Object.getOwnPropertyDescriptor(hong, 'name'));

hong.age = 20;//동적 생성 .을 찍고 입력하면 추가됨
console.log(Object.getOwnPropertyDescriptors(hong, 'age'));
//{ value: 20, writable: true, enumerable: true, configurable: true }


console.log(Object.getOwnPropertyDescriptor(hong));
//{ value: 20, writable: true, enumerable: true, configurable: true }

//getter / setter
//getter: 프라퍼티의 값을 획득, setter: 프라퍼티의 값을 변경

const person = {
    firstName : '홍',
    lastName : '길동',
    get fullName(){
        return`${this.firstName} ${this.lastName}`;
    },
    set fullName(name){
        // destructuring assigment(구조 분해 할당)
        //배열의 각각의 요소를 각각의 변수에 할당
        [this.firstName, this.lastName]=name.split(' ');
    }
};


person.fullName = '강 감찬';//set fullName이 호출됨
console.log(person.firstName, person.lastName);

console.log(person.fullName);//get fullName이 호출됨

//데이터 프라퍼티 정의
const lee = {};

Object.defineProperty(lee, 'name',{
    value: '이순신',
    writabl: false, //읽기
    enumerabl: false, //반복
    configurable: false //변경
});

lee.name = '장보고';//writable: false이므로 값 변경 불가
delete lee.name;// configurable: false이므로 프라퍼티 제거 불가

console.log(Object.getOwnPropertyDescriptor(lee, 'name'));

lee.age = 20;
console.log(Object.getOwnPropertyDescriptors(lee));

console.log(Object.keys(lee)); // enumerable: false이므로 age만 검색

// 객체 변경 불가
// 1. 확장금지: Object.preventExtensions => 프라퍼티 추가를 금지
// 2. 밀봉: Object.seal => 프라퍼티 읽기/쓰기만 가능
// 3. 동결: Object.freeze => 프라퍼티 읽기만 가능

const kang = {
    name: '강 감찬',
    age: 30,
};
// Object.preventExtensions(kang);
// kang.gender = '남';
// console.log(kang);

Object.freeze(kang);
delete kang.age;
console.log('kang');