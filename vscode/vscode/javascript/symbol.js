//240627(금)

//symbol
//자바 스크립트의 7번째 데이터 타입, 기본 데이터 타입
//ES6에서 부터 사용
//객체의 유일한 프라퍼티명(키)을 생성함

//symbol 생성
const symbol1 = Symbol();
console.log(typeof Symbol); //symbol

//symbol은 유일하다
const symbol2 = Symbol('key1');
const symbol3 = Symbol('key1');
console.log(symbol2 === symbol3);// false

//symbol.for로 심벌을 생성하면 전역스코프에 하나만 생김
const symbol4 = Symbol.for('key2');
const symbol5 = Symbol.for('key2');

console.log(symbol4 === symbol5);//true
console.log(Symbol.keyFor(symbol4)); // key2
console.log(Symbol.keyFor(symbol5)); // key2

//symbol을 상수의 값으로 사용
const YOIL = {
    MONDAY: Symbol('MONDAY'),
    SATURDAY: Symbol('SATURDAY'),
    SUNDAY: Symbol('SUNDAY')
};

const today = Symbol('MONDAY');
console.log(YOIL.MONDAY === today);//false
console.log(typeof YOIL.MONDAY); //symbol
console.log(Symbol.keyFor(today));// symbol

//symbol을 객체의 프라퍼티 키로 사용
const person = {
    [Symbol.for('name')]: '홍길동',
    [Symbol.for('age')]: 20
};

console.log(person[Symbol.for('name')]); //홍길동
console.log(person[Symbol.for('age')]); //20