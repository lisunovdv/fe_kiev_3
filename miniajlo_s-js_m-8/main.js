'use strict';
const playSound = note => {
    const audio = document.querySelector(`audio[data-note=${note}]`);
    audio.currentTime = 0;
    audio.play();
};

const buttons = Array.from(document.querySelectorAll("button"));
const keys = "qwertyuiop[]asdfghjkl;'zxcvbnm,./".split("");
let spase = keys.push(' '),
    activeBtn = {
    node: null
}

window.onkeydown = function (event) {
    event.preventDefault();
    for (let i = 0; i < buttons.length; i++) {
        if ((keys[i]) === event.key) {
            if (activeBtn.node === null){
            activeBtn.node = buttons[i];
            activeBtn.node.classList.add('keyboard__btn--active');
        }
            let btnAudio = buttons[i].getAttribute('data-note');
            console.log(btnAudio);
            let sound = document.getElementById('slideThree');

            if (sound.checked) {
                playSound(btnAudio);

            }
        }
    }
}

window.onkeyup = function (event) {

        activeBtn.node.classList.remove('keyboard__btn--active');
        activeBtn.node = null;

}
