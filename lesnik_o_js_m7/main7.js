const en = "qwertyuiop[]asdfghjkl;'zxcvbnm,./";
const ru = "йцукенгшщзхъфывапролджэячсмитьбю.";
const ua = "йцукенгшщзхїфівапролджєячсмитьбю.";

const keyTrainer = {
    layouts: {},
    langs: [],
    currentLang: '',

    addKeyboardLayout: function(alphabet, lang) {

        this.langs.push(lang);
        this.layouts[lang] = {
            topRow: [],
            middleRow: [],
            bottomRow: []
        }
        this.layouts[lang].topRow = Array.from(alphabet.slice(0, 12));
        this.layouts[lang].middleRow = Array.from(alphabet.slice(12, 23));
        this.layouts[lang].bottomRow = Array.from(alphabet.slice(23));

    },

    chooseLanguage: function() {
        let language = prompt('Введите строку клавиатуры: 0, 1 или 2, где 0-en, 1-ru, 2- ua', ' ');

        switch (language) {
            case '0':
                this.currentLang = 'en';
                alert('Вы выбрали английский язык');
                return en;
                break;

            case '1':
                this.currentLang = 'ru';
                alert('Вы выбрали русский язык');
                return ru;
                break;

            case '2':
                this.currentLang = 'ua';
                alert('Вы выбрали украинский язык');
                return ua;
                break;

            case null:
                break;

            default:
                alert('Выбран недоступный язык, попробуйте еще раз!');
                this.chooseLanguage();
        }
    },

    createLayout: function() {

        let layout = document.createElement('div');
        layout.classList.add('layout');
        document.body.appendChild(layout);

        let keys = this.layouts[this.currentLang];

        for (let key in keys) {
            let symbolsInRow = keys[key];
            console.log("symbolsInRow", symbolsInRow);
            let row = document.createElement('div');
            row.classList.add('row');
            layout.appendChild(row);

            for (let i = 0; i < symbolsInRow.length; i++) {
                let key = document.createElement('div');
                key.classList.add('key');
                key.textContent = symbolsInRow[i];
                row.appendChild(key);
            }
        }
    }
}

keyTrainer.addKeyboardLayout(en, 'en');
keyTrainer.addKeyboardLayout(ru, 'ru');
keyTrainer.addKeyboardLayout(ua, 'ua');
keyTrainer.chooseLanguage();
keyTrainer.createLayout();

console.log("keyTrainer", keyTrainer);