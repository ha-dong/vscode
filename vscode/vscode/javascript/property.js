//프라퍼티(pproperty)

const hong={};

//프라퍼티 동적 추가
hong.name = "홍길동";
hong.age = 20;
hong.gender = "mail";
hong['home-address'] = "어딘가";

//프라퍼티 리스트 확인
for(let key of Object.keys(hong)){
    console.log(key, hong[key]);
}

//프라퍼티 값 수정
hong.name = "강감찬";

//프라퍼티 삭제
delete hong.gender;
//프라퍼티 리스트 확인
for(let key of Object.keys(hong)){
    console.log(key, hong[key]);
}

//프라퍼티 축약
//프라퍼티 명과 프라퍼티에 저장된는 변수명이 같으면 
// 하나만 써준다.
const name = "이순신";
const age = 30;
const lee = {
    name,
    age
};

//프라퍼티 리스트 확인
for(let key of Object.keys(lee)){
    console.log(key, lee[key]);
}
//계산된 프라퍼티 명
const prefix  = "person";
let idx = 0;
const obj = {
    [`${prefix}-${++idx}`]: idx,
    [`${prefix}-${++idx}`]: idx,
    [`${prefix}-${++idx}`]: idx
};
for(let key of Object.keys(obj)){
    console.log(key, obj[key]);
}

//메서드 축약
const dog={
    name: '강아지',
    getName: function(){
        return this.name;
    }
};
console.log(dog.getName());

//메서드 축약
const dog2={
    name: '강아지',
    getName(){
        return this.name;
    }
};
console.log(dog.getName());