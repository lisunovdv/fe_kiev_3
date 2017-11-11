const en = "qwertyuiop[]asdfghjkl;'zxcvbnm,./";
const ru = "йцукенгшщзхъфывапролджэячсмитьбю.";
const ua = "йцукенгшщзхїфівапролджєячсмитьбю.";

let keyTrainer = {
    layouts: {},
    langs: [],
    currentLang: '',
    keysQuantity: 0,
    addKeyboardLayout: function (alphabet, lang) {
        let findChar = (x) => alphabet.indexOf(x);
        this.langs.push(lang);
        this.layouts[lang] = {
            topRow: [],
            middleRow: [],
            bottomRow: []
        }
        this.layouts[lang].topRow[0] = alphabet.slice(0, findChar('a'));
        this.layouts[lang].middleRow[0] = alphabet.slice(findChar('a'), findChar('z'));
        this.layouts[lang].bottomRow[0] = alphabet.slice(findChar('z'));
    },
    createLayout: function () {
        this.currentLang = this.currentLang || 'en';
        let keyContainer = document.createElement('form');
        keyContainer.classList.add('keyboard');
        let radio = document.createElement('input');
        radio.type = 'checkbox';
        let alphabet = this.getFullAlph();

        for (let i = 0; i < 33; i++) {
            let keyBtn = document.createElement('button');
            keyBtn.classList.add('keyboard__btn');
            keyBtn.innerHTML = alphabet[i];

            if (i < 12) {
                keyBtn.dataset.note = 'do';
            } else if (i === 12) {
                keyBtn.dataset.note = 're';
                keyBtn.style.marginLeft = '20px';
            } else if (i < 23) {
                keyBtn.dataset.note = 're';
            } else if (i === 23) {
                keyBtn.dataset.note = 'mi';
                keyBtn.style.marginLeft = '40px';
            } else if (i >= 23) {
                keyBtn.dataset.note = 'mi';
            }

            keyContainer.appendChild(keyBtn);
        }

        keyContainer.insertAdjacentHTML('beforeEnd', '<label> Disable sound. </label>');
        keyContainer.querySelector('label').prepend(radio);
        document.body.appendChild(keyContainer);
    },
    getRandomNum: function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },
    getFullAlph: function () {
        let langObj = this.layouts[this.currentLang];
        let result = '';
        for (let key in langObj) {
            if (langObj.hasOwnProperty(key)) {
                result += langObj[key];
            }
        }
        return result;
        console.log(result);
    },
    getRandCharInAlph: function () {
        let result = this.getFullAlph();
        return result.charAt(this.getRandomNum(0, result.length));
    },
    nextChar: function () {
        let errors = 0;
        let randChar;
        let result;
        let msg;

        if (this.keysQuantity === 0) {
            alert('You didn\'t set keys quantity.');
            return;
        }

        console.count('\nStart training');
        for (var i = 0; i < this.keysQuantity; i++) {
            randChar = this.getRandCharInAlph();
            result = prompt(randChar, '');

            if (randChar === result) {
                console.log(`${i + 1}. ${randChar} === "${result}": true`);
            } else if (result === null){
                console.log('Exiting training.');
                break;
            } else {
                console.error(`${i + 1}. ${randChar} === "${result}": false`);
                ++errors;
            }
        }

        msg = (errors === 1) ? `You made ${errors} mistake.` : `You made ${errors} mistakes.`;
        alert(msg);
        console.log(msg);
    },
    setLang: function () {
        switch (prompt('Choose a language... \n 0-en, 1-ru, 2-ua' , '')) {
            case '0':
                this.currentLang = 'en';
                break;
            case '1':
                this.currentLang = 'ru';
                break;
            case '2':
                this.currentLang = 'ua';
                break;
            case null:
                break;
            default:
                alert("You've choosen an unavailable language.");
                this.setLang();
        }
    },
    setKeysQuantity: function () {
        let num = +prompt('Choose the quantity of keys you want to ptactice in keytrainer...', '');
        if (typeof num === 'number' && num > 0 && num < 34 ) {

            this.keysQuantity = num;
            console.log(this.keysQuantity);
        } else {
            alert('You can insert only numbers between 1 and 33s inclusive.');
        }
        return;
    },
}

let testFn = function() {
    if (keyTrainer.currentLang === '') {
        console.log('testFn: No language to test. Please choose a language.');
    } else {
        let i = 50;

            console.groupCollapsed('test getRandCharInAlph()');
        while (i > 0) {
            console.log('Random character = ' + keyTrainer.getRandCharInAlph());
            i--;
        }
        console.groupEnd();
    }
}

let bindKeysQuantity = keyTrainer.setKeysQuantity.bind(keyTrainer);
let bindNextChar = keyTrainer.nextChar.bind(keyTrainer);
let bindLayout = keyTrainer.createLayout.bind(keyTrainer);

document.querySelector('[name="setKeys"]').addEventListener('click', bindKeysQuantity);
document.querySelector('[name="runTrainer"]').addEventListener('click', bindNextChar);
document.querySelector('[name="makeKeyboard"]').addEventListener('click', bindLayout);


window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);


let down = false;

function keyDownHandler (event) {
    down ? false :
    down = true;

    const alph = keyTrainer.getFullAlph();
    const pressedKey = alph.indexOf(event.key);
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

    for (key of keys) {
        if (key.innerHTML === event.key) {
            key.classList.add('keyboard__btn--active');
            break;
        }
    }
}

function keyUpHandler () {
    down = false;

    for (key of document.querySelectorAll('button[data-note]')) {
        if (key.classList.contains('keyboard__btn--active')) {
            key.classList.remove('keyboard__btn--active');
            break;
        }
    }
}

keyTrainer.addKeyboardLayout(en, 'en');
keyTrainer.addKeyboardLayout(ru, 'ru');
keyTrainer.addKeyboardLayout(ua, 'ua');
keyTrainer.setLang();
testFn();
