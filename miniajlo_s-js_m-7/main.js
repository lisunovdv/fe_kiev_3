'use strict';

let keyboard = {

    layouts: {
        en: {
            topRow: ['qwertyuiop[]\\'],
            middleRow: ['asdfghjkl;\''],
            bottomRow: ['zxcvbnm,./']
        },
        ru: {
            topRow: ['йцукенгшщзхъ\\'],
            middleRow: ['фывапролджэ'],
            bottomRow: ['ячсмитьбю.']
        },
        ua: {
            topRow: ['йцукенгшщзхїґ'],
            middleRow: ['фівапролджє'],
            bottomRow: ['ячсмитьбю/']
        }
    },
    createLayout: function() {
        let keyboardLang = this.layouts[this.currentLang];
        let form = document.createElement('form');
        document.body.appendChild(form);
        for (let string in keyboardLang) {
            let row = keyboardLang[string];

            let newRow = document.createElement('div');
            newRow.classList.add('keyboard__row');
            console.log('keyboardLang = ' + keyboardLang);
            console.log('row = ' + row);

            form.appendChild(newRow);
            for (let i = 0; i < row[0].length; i++) {
                let btn = document.createElement('button');
                btn.className = 'keyboard__btn';
                btn.innerHTML = row[0][i];
                newRow.appendChild(btn);
            }
        }
    },

    chooseLanguage: function() {
        switch (prompt('Выберите ваш язык en-0, ru-1, ua-2', '')) {
            case '0':
                this.currentLang = 'en';
                console.log(this.currentLang);
                return this;
                break
            case '1':
                this.currentLang = 'ru';
                return this;
                break;
            case '2':
                this.currentLang = 'ua'
                return this;
                break;
            case null:
                break;
            default:
                alert('Выберите язык!');
                return this.chooseLanguage();
        }
    }

};
keyboard.chooseLanguage().createLayout();
