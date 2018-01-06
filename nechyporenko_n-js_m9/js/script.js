'use strict';

let keyTrainer = {
    layouts: {
        en: "qwertyuiop[]asdfghjkl;'zxcvbnm,./",
        ru: "йцукенгшщзхъфывапролджэячсмитьбю.",
        ua: "йцукенгшщзхїфівапролджєячсмитьбю."
    },

    langs: [],
    currentLang: '',
    numberOfCharacters: '',
    randChars: [],

    getLayouts: function() {
        if (typeof(this.layouts.en) == 'string') {
            for (let key in this.layouts) {
                this.layouts[key] = {
                    topRow: this.layouts[key].split('').slice(0, 12),
                    middleRow: this.layouts[key].split('').slice(12, 23),
                    bottomRow: this.layouts[key].split('').slice(23),
                    whiteSpace: [" "],
                };
                this.langs.push(`${key}`);
            };
        };
        return this;
    },

    getCurrentLang: function() {
        let userLang = prompt('Please chose your language: en - 0, ru - 1, ua - 2');

        if (userLang == null) {
            return;
        } else if (userLang != '' && userLang >= 0 && userLang <= 2 && Number.isInteger(+userLang)) {
            this.currentLang = this.langs[userLang];
        } else {
            alert('This language is not available. Please, chose language: en - 0, ru - 1, ua - 2');
            this.getCurrentLang();
        };

        return this;
    },

    createLayout: function() {
        let keyboard = document.querySelector('.keyboard');
        let htmlString = '';
        let rowData = {
            note: [],
            rowKeys: [],
        };
        let audioFiles = document.querySelectorAll(`audio`);
        for (let index of audioFiles) {
            rowData.note.push(index.dataset.note);
        };

        for (let key in this.layouts[this.currentLang]) {
            let obj = this.layouts[this.currentLang];
            rowData.rowKeys = obj[key];
            let html;

            if ( rowData.rowKeys.length == 1 ) {
                html = document.querySelector('#whitespace').textContent.trim();
            } else {
                html = document.querySelector('#letterkeys').textContent.trim();
            };

            let compiled = _.template(html);
            let result = compiled(rowData);
            htmlString += result;
        };

        keyboard.innerHTML = htmlString;
        return this;
    },
};


keyTrainer.getLayouts()
    .getCurrentLang()
    .createLayout();


let buttons = Array.from(document.querySelectorAll("button"));
let sound = document.getElementById("volume");

let callback = (event) => {
    let keyName = event.key;

    for (let items of buttons) {
        if (items.innerHTML == event.key) {
            items.classList.add('keyboard__item--active');

            if (sound.checked == true) {
            playSound(`${items.dataset.note}`);
            };
        };
    };
};


let keyUpHandler = (event) => {
    for (let items of buttons) {
        if (items.classList.contains('keyboard__item--active')) {
        items.classList.remove('keyboard__item--active');
        };
    };
};


let playSound = note => {
  let audio = document.querySelector(`audio[data-note=${note}]`);

  audio.currentTime = 0;
  audio.play();
};


window.addEventListener("keydown", callback);
window.addEventListener("keyup", keyUpHandler);
