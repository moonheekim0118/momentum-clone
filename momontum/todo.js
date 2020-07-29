const todoform = document.querySelector('.todoForm');
const todoinput = todoform.querySelector('input');
const todoList = document.querySelector('.todoList');
const showTodo = document.querySelector('.showToDo');
const taskBoard = document.querySelector('.taskBoard');
const operations = document.querySelector('.operations');
const TO_DOS= 'toDos'
let toDos =[]; // object 형태로 text와 id값을 넣어서 배열로 저장하여 localStroage에 저장한다. 

function saveTodo(){  // 변경된 toDOs를 localStroage에 저장한다. 
    localStorage.setItem(TO_DOS,JSON.stringify(toDos));
}

function paint_todo(task){ // to do list를 불러와서 html로 보여준다. 
    let li = document.createElement('li');
    const delBtn = document.createElement('button'); //delete 버튼 추가 
    delBtn.innerText="X";
    delBtn.addEventListener('click',deleteTodo); // 이벤트 리스너 --> 삭제 
    const span = document.createElement("span"); 
    const newId= toDos.length === 0 ? 0 : (+toDos[toDos.length-1].id)+1; // li id 지정 
    const checkbox = document.createElement("INPUT"); // 체크박스 추가 
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener('click',checkDone); // 이벤트 리스너 

    span.innerText=task;
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id=newId;
    todoList.appendChild(li);
    const toDoObj = {
        text:task,
        id:newId
    }
    toDos.push(toDoObj);
}

function handletoDoSubmit(){ //입력받은 to do 저장 
    event.preventDefault();
    const newTodo= todoinput.value;
    if(newTodo.length>0){// task 가 1자 이상이어야 함 
        paint_todo(newTodo);
        saveTodo();
        todoinput.value="";
    }
}


function loadToDos(){ // localstroage에 있는 toDOList불러오기 
    const loadedToDos = localStorage.getItem(TO_DOS);
    if(loadedToDos !== null){
        const parsedTodos = JSON.parse(loadedToDos);
        parsedTodos.forEach(function(todo){
            paint_todo(todo.text);
        });
    }
}

function toDoList(){ // ToDO 버튼 누르면 todolist연산 할 수 있는 목록 보여준다. 
    if(taskBoard.classList.contains('showing')){
        taskBoard.classList.remove('showing');
    }else{
        taskBoard.classList.add('showing');
        loadToDos();
    }
}


function deleteTodo(event){ // todo 지우기 
    const deleteli= event.target.parentNode;
    todoList.removeChild(deleteli);
    const cleanTodos= toDos.filter(function(toDo){
        return toDo.id !== parseInt(deleteli.id);
    });
    toDos = cleanTodos; // localStroage에 다시 저장 
    saveTodo();
}

function checkDone(event){ // to do check 하기 
    const task = event.target.nextSibling;
    if(event.target.checked){
      task.classList.add('checked');
    }else {
      task.classList.remove('checked');
    }
}


function init(){
    showTodo.addEventListener('click', toDoList);
    todoform.addEventListener('submit',handletoDoSubmit);
}

init();
