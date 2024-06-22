//즉시 실행 함수(IIFE, Immediately Invoked Function Expression)
(function(){ //괄호로 묶어주고 인자가 있으면 넣고 없으면 안넣는다. {}실행부 뒤에 괄호는 감싸는 역할
    const a = 3;
    const b = 5;
    console.log(3 + 5);
}());

(function(a, b){
    console.log(a+b);
}(1,2));

//즉시 실행 함수
//(function(a, b){return a + b;}(1, 2)) ==> 실행 결과 3이라는 값(표현식)
const result = (function(a, b){
    return a + b;
}(1,2));
console.log(result);

//함수 표현식
// (function(a, b){return a + b;} ==> 함수값(표현식)
const result2 = function(a, b) {
    return a+b;
};
console.log(result2);

//재귀함수\
//함수가 자기 자신을 호출, 반드시 종료 조건이 있어야 함
function factorial(n){
    if(n<=1)return 1;
    return n* factorial(n-1);
}

console.log(factorial(1)); //
console.log(factorial(3)); //
console.log(factorial(10)); //3628800

//중첩합수
//함수 내에 함수를 정의해서 바깥쪽 함수가 인쪽 함수의 기능을 독립적으로 사용
//기능을 독립적으로 사용, 클로져(closure) 생성 시 주로 사용
function outer(){
    inner();    //inner 함수가 outer함수 블록 상단에 호이스팅 된다.(선언이 상단으로 끌러올려짐)
    const o = 'o';
    console.log(0);
    function inner(){
        const i = 'i';
        console.log(i);
    }//inner
       
    //console.log(i);  i는 inner함수의 스코프를 가진다.
    inner();
}//outer

outer();
//inner();
// outer.inner();


//콜백(callback)함수: 함수(고차함수)의 파라미터로 전달되는 함수
//콜백함수의 유용성: 함수(기능)를 함수에 값으로 전달할 수 있어서 함수 상호간의 독립성을 유지할 수 있으며 
//                 프로그램 전체를 유연하고 확정성 있게 구성할 수 있음

//고차(heigher-order)함수: 콜백 함수를 전달받은 함수
//콜백 함수는 이벤트 처리, ajax통신, 타이머함수 등에 사용됨
//hofunction 고차함수, f 콜백함수

const hofunction = function(f, str){
    console.log(f(str));
}

const cbfunction = function(str){
    return 'cbfunction: ' + str;
};

hofunction(cbfunction, 'hello');

//배열의 고차함수
//forEach: 배열의 각 요소마다 기능을 수행
//map: 배열의 각 요소에 기능을 수행한 결과 배열을 얻음
//filter: 배열의 각 요소들 중에서 조건을 만족(true)하는 요소들의 배열을 얻음
//reduce: 배열의 요소들에 대한 합계를 얻음

const arr = [1, 2, 3, 4, 5];
const forEachArr = arr.forEach(function(element){
    console.log(element);
});
console.log(forEachArr);

const mapArr = arr.map(function(element){
    return element % 2;
});
console.log(mapArr);

const filterArr = arr.filter(function(element){
    return element % 2;
});
console.log(filterArr);

const sum = arr.reduce(function(acc, curr){
    return acc+curr;
},0);

console.log(sum);
//실습) 배열고차함수
const exarr = [1, 'a', 'b', 2, 3, 'c', 4, 'd', 'e', 'f', 5];

//1) axarr에서 숫자들의 합
    const arrSum = exarr.reduce(function(acc, curr){
        if(typeof curr === 'number'){
            return acc + curr;
        }else if(typeof ele ==='string'){
            return acc + 0;
        }
    });
console.log(arrSum);

//2) axarr에서 숫자들의 제곱 값으로 문자들은 아스키코드값으로 변환한 배열
const arrChar = exarr.map(function(elem){
    if(typeof elem === 'number'){
        return elem * elem;
    }else if(typeof elem === 'string'){
        return parseInt(elem);
    }
});
console.log(arrChar);

// 3) 문자들 중에서 아스키코드값이 홀수인 것들의 배열 만들기
const resultArrr = exarr.filter(function(elem){
    if(typeof elem === 'string'){
        return elem.charCodeAt(0) % 2 == 1;
    }
});
console.log(resultArrr);

// 4) 숫자는 문자로, 문자는 숫자(아스키코드값)로 변환한 배열 만들기
const resultAarr = exarr.map(function(ele){
    if(typeof ele === 'number'){
        return String(ele); //ele.toString(), ''+ele, ""+ele
    }else if(typeof ele === 'string'){
        return ele.charCodeAt(0);
    }
});
console.log(resultAarr);
// 5) 모든 숫자와 모든 문자들의 아스키코드값의 합계 구하기
const reduceResult = exarr.reduce(function(element){
    if(typeof element === "number"){
        return String(element);
    }else if(typeof element === 'string'){
        return element.charCodeAt(0);
    }
    return element+element;
});
console.log(reduceResult);


// 실습) 배열고차함수 - JSON
const jsonArr = [
    {"name": "홍길동", "age": 38, "gender": "M", "email": "hong@hong.com"},
    {"name": "유관순", "age": 18, "gender": "F", "email": "ryu@ryu.com"},
    {"name": "이순신", "age": 62, "gender": "M", "email": "lee@lee.com"},
    {"name": "신사임당", "age": 25, "gender": "F", "email": "sin@sin.com"},
    {"name": "장보고", "age": 45, "gender": "M", "email": "jang@jang.com"}
];

// 1) 각 사람의 나이에 1을 더해 출력
jsonArr.forEach(function(obj){
    console.log(obj.name, obj.age+1);
});

// 2) 성별을 M은 남자로 F는 여자로 변환한 배열 생성
const genderChan = jsonArr.map(function(obj){
        // obj.number=obj/gender == 'm' ?'남자' : '여자'{
        //     return obj;
        // };
});
console.log(genderChan);

// 3) 나이가 30이하인 사람들만 추출해서 배열 생성
// const ageChan = jsonArr.filtera(function(obj){
//     obj.number=obj/gender == 'm' ?'남자' : 여자
// });
// console.log(ageChan);

// 4) 이메일주소의 @ 앞부분이 4자리 이상인 사람들만 추출해서 배열 생성
/*const rArr3 = jsonArr.filtera(function(obj){
    if(obj.email.substring(0, obj.email.indexOf('@')).length >= 4){{
        return obj;
    }

    }
});
console.log(rArr3);*/


// 5) 각 사람들의 나이의 합계를 출력
const ageAdd = jsonArr.reduce(function(acc, obj){
    return acc+obj.age;
}, 0);
console.log(ageAdd);

// 실습) 고차함수 - AJAX로 데이터 불러와서 실습해 주셈!
//       https://jsonplaceholder.typicode.com/users
const axios = require('axios');
axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/users'
  })
    .then(function (response) {
      console.log(response.data);
    });
const test = function(axiosArr){
// 1. '.net' 이메일을 사용하는 사용자들만 추출해서 배열 생성
const axiosMail = axiosArr.filter(function(elem){
    if(elem.email.indexOf('\.net') > 0){
        return elem;
    }
});
console.log(axiosMail);

// 2. 회사이름에 "Romaguera"가 포함된 사용자들만 추출해서 배열 생성
const axiosUser = axiosArr.filter(function(elem){
    if(elem.company.name.indexOf('Romaguera')){
        return elem;
    }
});
console.log(axiosUser);

// 3. "Gwenborough" 도시에 사는 모든 사용자의 id의 합계를 출력
const axiosId = axiosArr.reduce(function(res1, res2){
    if(res2.address.city === 'Gwenborough'){
        return res1 + parseInt(res2.id);
    }else{
        return res1 + 0;
    }
});
console.log(axiosId);

// 4. id가 홀수인 사용자들 중에 lat과 lng의 합이 0 이상인 사용자들의 배열
const arr3 = axiosArr.filter(function(obj){
    if(obj.id % 2 == 1 &&
        (parseFloat(obj.address.geo.lat)
        +parseFloat(obj.address.geo.lng)>-0)){

        return obj;
        }
    });

console.log(arr3);
// 5. id가 홀수인 사용자들 중에 이메일주소의 @문자 뒤의 글자가 4이상인
//    사용자들 중에서 zipcode가 7글자 이하인 사용자들의 배열

const  arr4 = axiosArr.filter(function(obj){
    if(obj.id % 2 == 1
        && obj.email.substring(obj.email.indexOf('@')+1).length>=4
        &&obj.address.zipcode.length<=7{
            return obj;
        }
});
console.log(arr4);
};


