window.onload = function(){
    document.getElementById("btn").addEventListener(
        "click",
function(){
    const r = document.getElementById("r").value;
    const g = document.getElementById("g").value;
    const b = document.getElementById("b").value;

    document.body.style.background =
    'rgb(${r}, ${g}, ${b},)';
    }
    );
}