'use strict';

const lang = {
  en: "qwertyuiop[]asdfghjkl;'zxcvbnm,./",
};

const keyTmp = document.querySelector('#key-tmp').textContent.trim();
const keyboardTmp = document.querySelector('#keyboard-tmp').textContent.trim();
const compiledKeyboard = _.template(keyboardTmp);
const resultKeyboard = compiledKeyboard();

function makeKeyboardRow(start, num, note) {
  const alphabet = lang.en;
  const compiledKey = _.template(keyTmp);
  let resultKey = '';
  for (let i = start; i < start + num; i++) {
    resultKey += compiledKey({ alphabet, i, note });
  }
  return resultKey;
}

document.querySelector('#root').innerHTML = resultKeyboard;

let down = false;

function keyDownHandler(event) {
  down ? false : down = true;

  const pressedKey = event.key === ' ' ? 33 : lang.en.indexOf(event.key);
  const keys = document.querySelectorAll('button[data-note]');
  const playSound = (note) => {
    const audio = document.querySelector(`audio[data-note=${note}]`);
    audio.currentTime = 0;
    audio.play();
  };

  if (document.querySelector('.keyboard [type="checkbox"]').checked !== true && pressedKey !== -1) {
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

  for (const key of keys) {
    if (key.textContent === event.key || key.name === event.code) {
      key.classList.add('keyboard__btn--active');
      break;
    }
  }
}

function keyUpHandler() {
  down = false;

  for (const key of document.querySelectorAll('button[data-note]')) {
    if (key.classList.contains('keyboard__btn--active')) {
      key.classList.remove('keyboard__btn--active');
      break;
    }
  }
}

window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);

