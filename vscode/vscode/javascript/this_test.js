//0625(화)

//this실습

// console.log(window===globalThis);//in web browser
console.log(global===globalThis);//in node

//웹 브라우저의 전역객체: window 또는 globalThis
//node의 전역객체: global 또는 globalthis

const g = globalThis;
// console.log(g);

g.name = 'global';
console.log(g.name);

console.log('1): '+this.name);//1번 node에서 전역 this => {}

function func1(){
    console.log('2): '+this.name);//2번 node에서 일반함수 내에서의 this => global
}
func1();

function Person(name){
    this.name = name;
    console.log('3): '+ this.name);//3번
}
const person = new Person('강감찬');

const hong ={
    name: '홍길동',
    getName(){
        return this.name;
    },
    printnName(){
        setTimeout(function(){
            console.log('5): '+this.name); //5번
        }, 100);
        setTimeout(() => console.log('6): '+this.name)); //6번
    }
};
console.log('4): '+hong.getName); //4번
hong.printnName();

function func2(){
    const name = 'func2';
    console.log('7): '+this.name);//7번
    function func3(){
        const name = 'func3';
        console.log('8): '+this.name)//8번
    }
    func3();
}func2();