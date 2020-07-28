loadEvents();


function loadEvents(){
  document.querySelector('form').addEventListener('submit',submit);  // new task submit 시
  document.getElementById('clear').addEventListener('click',clearList); // clear click시
  document.querySelector('ul').addEventListener('click',deleteOrTick); // 삭제 or done표시 

}
// subit data function
function submit(e){
  e.preventDefault();
  let input = document.querySelector('input');
  if(input.value != '')
    addTask(input.value); // task 추가 
  input.value = '';
}

// add tasks
function addTask(task){
  let ul = document.querySelector('ul');
  let li = document.createElement('li');
  li.innerHTML = `<span class="delete">×</span><input type="checkbox"><label>${task}</label>`;
  ul.appendChild(li);
  document.querySelector('.tasksBoard').style.display = 'block';
}

// clear the LIST
function clearList(e){
  console.log(e);
  let ul = document.querySelector('ul').innerHTML = '';
}

// deleteTick
function deleteOrTick(e){
  if(e.target.className == 'delete')
    deleteTask(e);
  else {
    tickTask(e);
  }
}

// delete task
function deleteTask(e){ //삭제 
  let remove = e.target.parentNode;
  let parentNode = remove.parentNode;
  parentNode.removeChild(remove);
}

// tick a task
function tickTask(e){
  const task = e.target.nextSibling;
  if(e.target.checked){
    task.style.textDecoration = "line-through";
    task.style.color = "#ff0000";
  }else {
    task.style.textDecoration = "none";
    task.style.color = "#2f4f4f";
  }
}