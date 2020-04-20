const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

function filterFn(toDo) {
    return toDo.id === 1
}

let toDos = [];

function deleteToDo (event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    //filter:각각의 callbackfn 을 호출
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    // localStorage 는 value 값을 string으로 저장한다. (자바스크립트 data저장 불가) 그래서 json 트릭 사용.
    // json.stringify 는 자바스크립트 object를 string으로 바꿔줌.
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj); // push -> array에 element 를 넣어줄수 있다.
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos); // javascript object로 변환해줌.
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
         });
        // forEach : array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜 줌.
        
    }
}
    function init() {
        loadToDos();
        toDoForm.addEventListener("submit", handleSubmit);
    }

    init();
