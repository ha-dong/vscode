window.onload = function() {
    //jsom에서 사용하는 javascript의 데이터 타입

    const obj = {}; //object
    const arr = []; //array
    const str = ""; //string
    const num = 0; //number
    const bool = false; // boolean
    const nul = null;

    const result = document.getElementById("result");

    //json object
    const person = {
        "name": "홍길동",
        "age": 20,
        "gender": MIDIAccess,
        "married": false
    };
    person.age = 30;
    result.innerHTML = person.name + ", " + person.age
        + person.gender + ", " + person.married;

    //json array
    const personArr =[
        {"name": "강감찬", "age": 60},
        {"name": "장보고", "age": 30},
        {"name": "이순신", "age": 70}
    ];
    personArr[1] = {"name": "권율", "age": 80};
    result.innerHTML = personArr[1].name
        + ", " + personArr[1].age;

    const personArrLeng = personArr.length;
    let printStr;
    for(let i = 0; i <personArrLeng; i++){
        result.innerHTML= personArr[i].name
            + ", " + personArr[i].age + "<br />"
    }
    result.innerHTML = printStr;
//json형태의 문자열
    const jsonObjStr = {"name":"홍길동", "age":20};
    result.innerHTML = jsonObjStr;

//json 문자열로 json object로
    const jsongObj = eval("(" + jsonObjStr + ")");
    result.innerHTML = jsongObj.name;

//json object를 json 문자열로
    JSON.stringify(jsonObj);
}