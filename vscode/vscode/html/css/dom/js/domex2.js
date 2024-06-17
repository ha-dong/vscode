window.onload = function(){
    const num1 = document.getElementById("num1");
    const num2 = document.getElementById("num2");

    const result = document.getElementById("result");

    add.addEventListener("click", function(event){

        result.innerHTML =
        parseInt(num1.value)+parseInt(num2.value);
    });

    sub.addEventListener("click", function(event){

        result.innerHTML =
        parseInt(num1.value)-parseInt(num2.value);
    });

    div.addEventListener("click", function(event){

        result.innerHTML =
        parseInt(num1.value)/parseInt(num2.value);
    });

    mul.addEventListener("click", function(event){

        result.innerHTML =
        parseInt(num1.value)*parseInt(num2.value);
    });
}