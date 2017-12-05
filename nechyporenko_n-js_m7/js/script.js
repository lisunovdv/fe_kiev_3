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
                    bottomRow: this.layouts[key].split('').slice(23)
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
        let items = ``,
            lines = ``;

        for (let key in this.layouts[this.currentLang]) {
            let obj = this.layouts[this.currentLang];
            let row = obj[key];

            for (let i = 0; i < row.length; i++) {
                items += `<li class="keyboard__item"><p class="keyboard__letter">${row[i]}</p></li>`;
            };

            lines += `<ul class="keyboard__row">${items}</ul>`;
            items = ``;
        };

        keyboard.insertAdjacentHTML('afterbegin', lines);
        return this;
    },
};

keyTrainer.getLayouts()
    .getCurrentLang()
    .createLayout();
