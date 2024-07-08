window.onload = function() {
    document.getElementById("btn").addEventListener(
        "click",
        function(){
            //1. XMLHttpRequest 객체 생성
            const xhr = new XMLHttpRequest();

            //2.XHR 객체 초기화
            xhr.open("GET",
                    "http://localhost:8888/ajaxtest/assets/hello.txt",
                    true
            );
            
            //3. 요청 전송
            xhr.send();

            //4.콜백함수
            xhr.onreadystatechange = function(){
                console.log(xhr.readyState);
            }

            
        }
    );
}