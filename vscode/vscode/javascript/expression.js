//문장, 표현식
//문장(Statement): 엔진의 실행 단위
//표현식(Expression): 해석 후에 하나의 값이 될 수 있는 구문

//문자 예)
let l1;
let l2 = 100;
let l3 = 3+5;
let func = function(){
    console.log('func');
}

//표현식 예)
//해석 결과가 값이 될 수 있으므로 값을 사용할 수 있는 코드에 표현식을 사용할 수 있다.
3+5 //표현식
let x=5, y=5; //문장
x + y == 10 ? true : false; //표현식

//문장과 표현식 사용 예)
console.log(let v);//log함수 인자로 문장x

let a=5;
let b=5; 
console.log(a+b==10?true:false);

//문장과 표현식 사용 예2) 하나의 값으로 표현할 수 있는 애
if(a + b == 10? true : false){
    console.log("a와 b의 합은 10");
}