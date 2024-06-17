window.onload = function(){
    document.getElementById("btn").addEventListener(
        "click",
        function(){
            const svg = document.getElementById("rectsvg");
            const rect = document.getElementById("rect");

            rect.setAttribute("x", document.getElementById("rx").value);
            rect.setAttribute("y", document.getElementById("ry").value);

            rect.setAttribute("width", document.getElementById("rw").value);
            rect.setAttribute("height", document.getElementById("rh").value);

            rect.setAttribute("stoke","green");
            rect.setAttribute("stoke-width","6");

            rect.setAttribute("fill", "brown");

            svg.appendChild("rect");

            document.getElementsById("wrapper").appendChild("rect");
        }
    )
}
window.onload = function(){
    document.getElementById("btn").addEventListener(
        "click",
        function(){
            const svg = document.getElementById("rectsvg");
            const rect = document.getElementById("rect");

            rect.setAttribute("x", document.getElementById("rx").value);
            rect.setAttribute("y", document.getElementById("ry").value);

            rect.setAttribute("width", document.getElementById("rw").value);
            rect.setAttribute("height", document.getElementById("rh").value);

            rect.setAttribute("stoke","green");
            rect.setAttribute("stoke-width","6");

            rect.setAttribute("fill", "brown");

            svg.appendChild("circle");

            document.getElementsById("wrapper").appendChild("rect");
        }
    )
}