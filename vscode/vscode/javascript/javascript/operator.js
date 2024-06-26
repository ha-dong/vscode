//연산자(operator)
//항의 개수에 따른 분류

//1. 단항 연산자
+10
-10
++10
--10

//2.이항
10+10
30%4

//3.삼항
const x= 5;
console.log(x==10 ? "십" : "십아님");

//4.비교연산자
console.log(3==3);//true
console.log(3!=3);//false
console.log(3===3);//true
console.log(3!==3);//false
console.log(3=="3");//true, 한 쪽의 데이터타입을 변환해서라도 값이 같으면 true
console.log(3==="3");//flase, 데이터 타입까지 같아야 true
console.log(3=="삼");//false
console.log(false==0);//true (0>false)
console.log(1==true);// true(true>1)        0은 false가 될 수 있다 나머지는 아니다 고로 true가 나온다

console.log([]==false);
console.log({}==false);

//5.논리 연산자
//true나 false로 판별이 될 수 있는 값들도 논리 연산이 가능하다.
//=> 자바 스트립트는 현재 값보다 판별 후 의 값이 더 중요한 언어
//=> 연산에 필요하면 형변환이 자유롭게 일어나는 언어
const a = 3;
const b = 0;

console.log(a||b);//3
console.log(a&&b);//0
console.log(!a); //false
console.log(!b); //true
console.log(true||false);//true
console.log(true&&false);//false

//지수 연산자 
const c = 3;
const d = 4;

console.log(c**d);//3의 4제곱
console.log(Math.pow(c, d)); //3의 4제곱


//연산자 우선순위
//연산자 우선순위는 ()가 제일 높다.
//우선 연산할 것들을()로 묶어준다.

(2*3)||4==(((4+7)%3)>2)
// 1: (2*3)
// 2: (4*7)
// 3: ((4*7)%3)
// 4: (((4+7)&3)>2)
// 5: 4==(((4+7)%3)>2)
// 6:(2*3)||4==(((4+7)%3)>2)