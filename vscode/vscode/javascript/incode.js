//0625(화)

//encdoe /decode
//denode: 코드를 변환
//decode: 변환된 코드를 변환

const name = '홍길동';
const age = '20';
const gender = '남';

let uri = `http://www.naver.com/shop/product/1000?name=${name}$age=${age}$gender=${gender}`;

console.log(uri, '\n');

const enUri = encodeURI(uri);
console.log(enUri, '\n');

const deUri = decodeURI(enuri)
console.log(deUri);


console.log(uri, '\n');

const enuriComp = encodeURIComponent(uri);
console.log(enuriComp, '\n');

const deUriComp = decodeURIComponent(enuri)
console.log(deUriComp, '\n');