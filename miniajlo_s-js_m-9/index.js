
const lang = {
    en: "qwertyuiop[]asdfghjkl;'zxcvbnm,./"
};
let keyboard = {
    topRow: [],
    midleRow: [],
    bottomRow: [],
    space: 'space'
}

lang.en = lang.en.split("");
console.log(lang.en);

function addKeyboardLayout(a) {
    keyboard.topRow.push(a.slice(0, 12));
    keyboard.midleRow.push(a.slice(12, 23));
    keyboard.bottomRow.push(a.slice(23));
    return keyboard;
}



addKeyboardLayout(lang.en);
console.log(keyboard);


let html = document.querySelector('#keyboard').textContent.trim();

// console.log (html);

let compiled = _.template(html);

let result = compiled(keyboard);

 console.log (result);

let container = document.querySelector('.keyboard');
container.innerHTML = result;

const buttons = Array.from(document.querySelectorAll("button"));
const keys = "qwertyuiop[]asdfghjkl;'zxcvbnm,./".split("");
let spase = keys.push(' ');
console.log(keys);
// window.onclick = function(event){
//     event.preventDefault();
// }
window.onkeydown = function (event) {
    let array = document.querySelectorAll('button');
    event.preventDefault();
    for (let i = 0; i < array.length; i++) {
        if ((keys[i]) === event.key) {
            array[i].classList.add('keyboard__btn--active');
            console.log(array[i]);
        }
    }
}

window.onkeyup = function (event) {
    let arrayTwo = document.querySelectorAll('button');
    for (let a = 0; a < arrayTwo.length; a++) {
        arrayTwo[a].classList.remove('keyboard__btn--active');
    }
}