/*jshint esversion: 6 */

const playSound = note => {
    const audio = document.querySelector(`audio[data-note=${note}]`);
    audio.currentTime = 0;
    audio.play();
};

const buttons = Array.from(document.querySelectorAll("button"));
const keys = "qwertyuiop[]asdfghjkl;'zxcvbnm,./ ".split("");

const onKeydown = event => {
    let pressedButton = event.which;
    let pressedLetter;
    let keyboardButton;
    let sound;
    let checkbox = document.querySelector("#slideThree");

    if (pressedButton >= 65 && pressedButton <= 90) {
        pressedLetter = String.fromCharCode(pressedButton).toLowerCase();
    } else {
        switch (pressedButton) {
            case 219:
                pressedLetter = "[";
                break;
            case 221:
                pressedLetter = "]";
                break;
            case 186:
                pressedLetter = ";";
                break;
            case 222:
                pressedLetter = "'";
                break;
            case 188:
                pressedLetter = ",";
                break;
            case 190:
                pressedLetter = ".";
                break;
            case 191:
                pressedLetter = "/";
                break;
            case 32:
                pressedLetter = " ";
                break;
        }
    }

    if (keys.includes(pressedLetter)) {
        keyboardButton = buttons[keys.indexOf(pressedLetter)];
        sound = keyboardButton.getAttribute("data-note");
        keyboardButton.classList.add("keyboard__btn--active");

        if (checkbox.checked) {
            playSound(sound);
        }

        setTimeout(() => {
            keyboardButton.classList.remove("keyboard__btn--active");
        }, 200);
    }
};

window.addEventListener("keydown", onKeydown);