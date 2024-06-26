//240626(수)
//es6의 추가사항

//es6는 함수를 다음 3가지로 구분한다.
// 1. 일반 함수: 객체 생성도 가능하고, 상속도 가능
//    메서드: 객체생성 불가, 상속 불가
// 2. 생성자 함수: 객체 생성 가능
// 3. 화살표 함수: 기능만 정의
//                this바인딩 안함(= 화살표 함수 내에서의 this는 상위 스코프를 따름)


const obj = {
    func1(){//일반함수

    },
    func2: function(){//메서드

    },
    func3 : () => {}//화살표함수
};

//화살표 함수
//화살표 함수는 표현식(값)
//화살표 함수는 주로 콜백함수로 많이 사용됨

//파라미터가 없을 때는 ()를 써줘야 함
//반환되는 값이 없을 떄는 {}를 써줘야 함
const af1 = () => {};

//파라미터가 한 개만 있을 때는 ()를 생략 가능
const af2 = x => {};

//파라미터가 두 개 이상을 있을때는 ()생략 불가
const af3 = (x, y) => {};

//반환값이 한 개면 return을 생략 가능
const af4 = x => x*x;

//객체 리터럴을 반환 한다면 ()로 묶어줘야 함'
const af5 = () => ({name: '홍길동', age: 20})

//함수 실행불가 2개 이상의 문장이면 {}를 써줘야 함
const af6 = (x, y) => {
    let sum = x+y;
    return sum;
};

//화살표함수를 콜백함수로 사용
[1, 2, 3, 4, 5].forEach(ele => console.log(ele));

//rest parameter
//-인가자 몇 개던 배열로 받도록 함
//-length에 영형을 주지 않음
//-rest파라미터와 일반 파라미터를 섞어 쓸 때는 일반 파라미터가 먼저 와야 함
//-rest파라미터는 한 개 함수에 한 개만 사용할 수 있음
//-rest파라미터는 기본값을 부여할 수 없다.

const add = function(...args){
    console.log(add.length)//파라미터의 개수
    console.log(add.arguments.length);//인자의 개수
    return args.reduce((acc, curr) => acc+=curr, 0);
};

console.log(add());//0 0
console.log(add(1));//0 1
console.log(add(1, 2));//0 2
console.log(add(1, 2, 3));//0 3

//파라미터 기본값
function multi(x=1, y=2){
    console.log(x*y);
}
multi(); //1*2
multi(3);//3*2
multi(3, 5);//3*5
multi(3, 5, 7);//3*5
