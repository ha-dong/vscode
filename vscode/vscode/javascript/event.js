//240701(월)
//Event(이벤트)

//자바 스크림트는 이벤트 기반 프로그래밍 모델
//이벤트가 발생하면 이벤트 객체가 이벤트 핸들러(=아밴투트리스너=이벤트콜백=이벤트 콜백=콜백)에
// 인자로 전달이 되서 이벤트 처리를 하는 프로그램 모델
// 자바 스크립트가 감지할 수 있는 모든 것은 이벤트
//  ex) 윈도루가 열림/닫힘, 마우스 누름/뗌 클릭, 키보드 누름/뗌, 스크롤, 데이터입력
//        이미지로드, 통신(데이터 송수신), 객체 상채...

//관련 용어
// event: 발생한 이벤트에 대한 이벤트 객체 ex) 이벤트 객체
// event type: 발생한 이벤트의 타입 ex) click
// event trigger: 이벤트 발생
// event attribute: 이벤트 핸들러 저장하는 엘리먼트의 속성
// event handler (=event listener = event callback)
//              :이벤트 처치를 위한 함수 ex)function(event){} 또는 event => {}

// event target(=evnt source): 이벤트를 발생시킨 객체 ex) <input type ="button"...>
// event currentTarget: 현재 이벤트 객체가 전달되어 있는 객체
// event phase (이벤트 단계):
//                          이벤트 전파 상태(1단계: 캡춰링, 2단계: 타겟, 3단계: 버블링)

// event propagatin (이벤트 전파): 발생한 이벤트가 DOM Tree의 상하를 따라 전달됨
// event bubbling (이벤트 버블링): 하위 엘리먼트에서 상위 엘리먼트로 이벤트가 전달
// event capturing (이벤트 캡춰링): 상위 엘리먼트에서 하위 엘리먼트로 이벤트가 전달
// event prevent: 이벤트 전파 금지
// default event: 엘리먼트가 가지고 있는 기본 이벤트 ex) a엘리먼트를 누르면 이동
// event delegation(이벤트 위임): 이벤트 타겟의 상위 엘리먼트가 이벤트를 처리

