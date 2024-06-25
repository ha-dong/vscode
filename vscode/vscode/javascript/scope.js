//스코프(Scope, 식별자 참조범위)

// 1. 전역 스코프
// 2. 함수 스코프
// 3. 블록 스코프
// 4. 모듈 스코프

// *var키워드의 경우 함수 내에서 var키워드로 선언된 변수만
// 함수의 지역변수이다. var는 블록 스코프를 따르지 않음

//스코프 체인
//하위 스코프에서 상위 스코프로 연결되어 있는 것
//변수 참조나 함수 호출 시에 자신의 스코프부터 상위 스코프로 계속해서 검색(본인 스코프에서 상위로 찾아간다는 말)

var x= 1; //global
let y= 2; //g
const z= 3; //g

console.log(x, y, z);

//func1: g, x:1, y:1
function func1(x, y){
    console.log(x, y);
}
func1(5, 10);

//func2: g
function func2(x, y){
    var x = 4; //func2 = local
    let y = 5; //func2 = l
    const z =6; //func2 = l

    function func3(){//func2 - l
        //var x; => undefined
        //x를 선언하기 전에 사용하면
        // => func3의 첫 라인에 선언문을 호이스팅 함
        console.log(x);
        var x = 7; //func3 - l
        let y = 8; //func3 - l
        const z = 9; //func3 - l
        console.log(x, y, z);
    }
    func3();
}
func2();

//var로 선언한 변수는 global scope를 따름
{
    var x = 10; //g
    let y = 11; //l
    const z = 12; //l
}
    console.log(x, y, z);

