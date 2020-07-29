const form = document.querySelector('.nameForm');
const input = form.querySelector('input');
const USER_STORAGE = "currentUser";
const greeting = document.querySelector(".greeting");
const nameModify= document.querySelector(".name_modify") // 이름 변경 

function paintGreeting(name){
    greeting.classList.add('showing');
    nameModify.classList.add('showing');
    nameModify.addEventListener('click', modifyName);
    let greetByTime= setGreetingMessage();
    greeting.innerHTML=`good ${greetByTime} ${name}!`;
}

function setGreetingMessage(){
    const date = new Date();
    const hour = date.getHours();
    if(hour < 12 ) return 'morning';
    if(hour < 18 ) return 'afternoon';
    return 'evening';
}

function modifyName(){
    nameModify.classList.remove('showing');
    greeting.classList.remove('showing');
    askForName();    
}
function saveName(name){
    localStorage.setItem(USER_STORAGE, name);
}
function handleSubmit(){
    event.preventDefault(); //버블 방지 
    const currentValue= input.value; // value추출
    input.value="";
    saveName(currentValue); // local storage에 이름 저장 
    form.classList.remove('showing');
    paintGreeting(currentValue);

}
function askForName(){
    form.classList.add('showing');
    form.addEventListener('submit', handleSubmit); // submit 눌러줬을 경우 
}
function loadName(){
    let currentUser =localStorage.getItem(USER_STORAGE);
    if(currentUser === null || "") { // 이름이 set되어 있지 않다면 form을 출력해주고, localStroage에 저장해줘야한다.
        askForName();
    }else{ // 이름이 이미 set 되어있다면 greeting 문구를 출력한다. 
        paintGreeting(currentUser);
    }


}

function init(){
    loadName();
}

init();