window.onload = function(){

    let wrapper = document.getElementById("wrapper");
    let div = document.createElement("DIV");
    let p = document.createElement("p");
    let text = document.createTextNode("Hello DOM");
    text.nodeValue = "Hello DOM";

    p.appendChild(text);
    div.appendChild(p);
    wrapper.appendChild(div);
}