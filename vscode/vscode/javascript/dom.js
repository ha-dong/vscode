//240701(월)
//dom (Document Object Model)
window.onload = function(){

//id가 stat인 엘리먼트
// const stat = document.getElementById("stat");
const stat = document.querySelector("stat");
console.log(stat);

//dataset 가져오기
console.log(stat.dataset.userName);
console.log(stat.dataset.userLevel);

//dataset변경
stat.dataset.userLevel = 'nomal';
console.log(stat.dataset.userLevel);
}

//firstChild, lastChild, nextSibling, previoussSibling
//모든 노드를 다 탐색

//firstElementchil, last[e]elementChild, newxtElementSiblind, previousElementSibling
// 엘리먼트 노드만 검색
const ul = document.querySelector("ul");
console.log(ul.childNodes.length);//7 TextNode포함
for(const each of ul.childrens){
    console.log('==='+each+'===')
}

console.log(ul.children.length);//3 // ElementNodes
for(const each of ul.children){
    console.log('===' +each+ '===')
}


console.log(ul.firstChild.nextSibling)
console.log(ul.firstElementChild)
console.log(ul.firstElementChild.nextElementSibling)