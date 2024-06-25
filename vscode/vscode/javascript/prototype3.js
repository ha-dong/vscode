//프라퍼티 디스크 립터(proterty dessceiptor)
// :프라퍼티의 속성값들을 저장하고 있는 객체
// :프라퍼티의 속성 값
// value: 프라퍼티의 값
// writable: 값의 수정가능 여부 (기본값: true)
// enumberable : 열거가능 여부 (기본값: true)
// configurable : 재정의 기능 여부 (삭제) (기본값: true)

const person={
    name: '홍길동'
};

person.age = 30;
person.gender = '남';

//person객체의 name프라퍼티의 디스크립터(데이터 프라퍼티)
// value, writable, enumable, configurable
console.log(Object.getOwnPropertyDescriptor(person, 'name'));

//person 객체의 모든 프라퍼티의 디스크립터
// console.log(Object.getOwnPropertyDessssssscriptors(person));

const hong ={
    name: '홍길동',
    get fullName(){
        return this.name;
    },
    set fullName(name){
        this.name = name;
    }
};

//hong객체의 name프라퍼티의 디스크립터(데이터 프라퍼티)
// value, writable, enumable, configurable
console.log(Object.getOwnPropertyDescriptor(hong, 'nssame'));

//hong객체의 hullName프라퍼티(메소드의) 디스크립터(접근자 프라퍼티)
//get, set, enumerable, configurable
console.log(Object.getOwnPropertyDescriptor(hong, 'fullName'));

//프라퍼티 정의
Object.defineProperty(hong, 'gender',{
    value: '남',
    Writable: false,
    enumerable: false,
    configurable: false
});

console.log(Object.getOwnPropertyDescriptor(hong, 'gender'));

//프라퍼티 열기

// 1. Object.keys
//gender는 enumerable이 false이므로 name, firstName만 나옴
console.log(Object.keys(hong));

//2. for~in
//gender는 enumerable이 false이므로 name, firstName만 나옴
for(key in hong){
    console.log(key, hong[key]);
}

// 객체 확장금지, 밀봉, 동결
// 확장금지: Object.preventExtensions 프라퍼티 추가 불가
// 밀봉: Object.seal 프라피터 추가/삭제 불가
// 동결: Object.freeze 프라퍼티 읽기만 가능

const kang ={
    name: '강감찬'
};

Object.preventExtensions(kang);
kang.age = 20; //추가 안됨
console.log(Object.keys(kang));

Object.seal(kang);
delete kang.name; //삭제 안됨
console.log(Object.keys(kang));

Object.freeze(kang);
kang.name = '강감순'; //변경이 되지 않음
console.log(kang.name);

//확장금지, 밀봉, 동결 여부 확인
console.log(Object.isExtensible(kang));
console.log(Object.isSealed(kang));
console.log(Object.isFrozen(kang));