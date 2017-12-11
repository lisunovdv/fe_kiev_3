// 'use strict';

const lang = {
  en: "qwertyuiop[]asdfghjkl;'zxcvbnm,./ ",
};

let keyTmp= document.querySelector('#key-tmp').textContent.trim();
let keyboardTmp = document.querySelector('#keyboard-tmp').textContent.trim();
let compiledKeyboard = _.template(keyboardTmp);
let resultKeyboard = compiledKeyboard();

function makeKeyboardRow (start, num, note) {
  const alphabet = lang.en;
  let compiledKey = _.template(keyTmp);
  let resultKey = '';
  for (let i = start; i < start + num; i++) {
    resultKey += compiledKey({alphabet, i, note});
  }
  return resultKey;
}

document.querySelector('#root').innerHTML = resultKeyboard;

window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);


let down = false;

function keyDownHandler (event) {
  down ? false :
  down = true;

  const pressedKey = lang.en.indexOf(event.key);
  const keys = document.querySelectorAll('button[data-note]');
  const playSound = note => {
    const audio = document.querySelector(`audio[data-note=${note}]`);
    audio.currentTime = 0;
    audio.play();
  };

  if (document.querySelector('.keyboard [type="checkbox"]').checked !== true && pressedKey !== -1){
    switch (keys[pressedKey].dataset.note) {
      case 'do':
      playSound('do');
      break;
      case 're':
      playSound('re');
      break;
      case 'mi':
      playSound('mi');
      break;
      default:
    }
  }

  for (let key of keys) {
    if (key.name === event.code) {
      key.classList.add('keyboard__btn--active');
      break;
    }
  }
}

function keyUpHandler () {
  down = false;

  for (let key of document.querySelectorAll('button[data-note]')) {
    if (key.classList.contains('keyboard__btn--active')) {
      key.classList.remove('keyboard__btn--active');
      break;
    }
  }
}
