/*jshint esversion: 6 */

const lang = {
    en: "qwertyuiop[]asdfghjkl;'zxcvbnm,./",
    firstRow: ['do', 're', 'mi', 'fa', 'sol', 'la', 'la', 'sol', 'fa', 'mi', 're', 'do'],
    secondRow: ['do', 're', 'mi', 'fa', 'sol', 'la', 'sol', 'fa', 'mi', 're', 'do'],
    thirdRow: ['do', 're', 'mi', 'fa', 'sol', 'sol', 'fa', 'mi', 're', 'do'],
};

const html = document.querySelector('#keyboard-template').textContent.trim();
const compiled = _.template(html);
const result = compiled(lang);
const keyboard = document.querySelector('.keyboard');

keyboard.innerHTML = result;

const playSound = note => {
    const audio = document.querySelector(`audio[data-note=${note}]`);
    audio.currentTime = 0;
    audio.play();
};

const buttons = Array.from(document.querySelectorAll("button"));
const keys = "qwertyuiop[]asdfghjkl;'zxcvbnm,./ ".split("");

const onKeyUp = (keyboardButton) => {
    console.log("It done!");
    setTimeout(() => {
            keyboardButton.classList.remove("keyboard__btn--active");
        }, 200);
};

const onKeydown = event => {   
    let pressedButton = event.key;
    let pressedLetter;
    let keyboardButton;
    let sound;
    let checkbox = document.querySelector("#slideThree");

    console.log(pressedButton.toLowerCase());

    if (keys.includes(pressedButton.toLowerCase())) {
        keyboardButton = buttons[keys.indexOf(pressedButton.toLowerCase())];
        sound = keyboardButton.getAttribute("data-note");
        keyboardButton.classList.add("keyboard__btn--active");

        if (checkbox.checked) {
            playSound(sound);
        }        
    }

    window.addEventListener("keyup", onKeyUp(keyboardButton));
};

window.addEventListener("keydown", onKeydown);
