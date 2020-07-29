const body = document.querySelector('body');
const IMG_NUMBER = 4;


function paintImage(imgNumber){
    const image = new Image();
    image.src =`images/${imgNumber+1}.webp`;
    image.classList.add("bgImage");
    body.prepend(image);
}
function generateNumber(){
    const number = Math.random()*IMG_NUMBER;
    return Math.floor(number);
}
function init(){
    const randomNumber= generateNumber();
    paintImage(randomNumber);
}

init();