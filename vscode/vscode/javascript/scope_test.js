var v1 = 1;
var v2 = 2;
console.log(v1, v2);
//1, 2

{
    console.log(v1, v2);// undefined 아 왜 고쳤을까
    v1 = 3;
    v2 = 4;
    console.log(v1, v2);// 3, 4
}

function func(){
    console.log(v1)// undefined ,v2 = error
    v1 = 7;
    var v1 = 5;
    // let v2 = 6;
    console.log(v1, v2);//5, 6
}

func();

console.log(v1, v2)
//전역에 있는 것을 가져오기 때문에 3, 4가 된다.