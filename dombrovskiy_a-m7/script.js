(function() {
  'use strict';

  const keyTrainer = {
    layouts: {
      en: {
        topRow: ['qwertyuiop[]'],
        middleRow: ['asdfghjkl;\''],
        bottomRow: ['zxcvbnm,./']
      },
      ru: {
        topRow: ['йцукенгшщзхъ'],
        middleRow: ['фывапролджэ'],
        bottomRow: ['ячсмитьбю.']
      },
      ua: {
        topRow: ['йцукенгшщзхї'],
        middleRow: ['фівапролджє'],
        bottomRow: ['ячсмитьбю.']
      }
    },
    langs: ['en', 'ru', 'ua'],
    currentLang: '',

    selectLanguage: function () {
      switch ( +prompt('Enter the Langs,(en - 0)(ru - 1)(ua - 2)?')) {
        case 0:
         return this.currentLang = 'en';
          break;
        case 1:
         return this.currentLang = 'ru';
          break;
        case 2:
         return this.currentLang = 'ua';
          break;
        case null:
          break;
        default:
          alert("Language not found, try again!");
          this.selectLanguage();
      }
    },

    randomElement: function (row) {
      let string = this.layouts[this.currentLang][row][0];
      let randomNumberForElement = (Math.floor(Math.random() * string.length));
      let randomElement = string.charAt(randomNumberForElement);
      return randomElement
    },

    randChar: function () {
      let randomNumberForAlphabet = (Math.floor(Math.random() * 3) + 1);

      switch (randomNumberForAlphabet) {
        case 1:
          return this.randomElement('topRow');
          break
        case 2:
          return this.randomElement('middleRow');
          break
        case 3:
          return this.randomElement('bottomRow');
          break
      }
      return
    },

    nextChar: function () {
      let errors = 0;
      let howManyLetters = +prompt('how many letters yow wanna training?');
      if (howManyLetters > 0 && howManyLetters !== "") {
        for (let i = 0; i < howManyLetters; i++) {
          let randomLetter = this.randChar();
            let forPrompt = prompt(randomLetter);
              if (randomLetter !== forPrompt) {
                  errors += 1;
              }
          }
        } else {
            alert('enter the number')
            this.nextChar();
        }
        return errors, console.log('errors = ', errors);
    },

    createLayout: function () {
        let keyboard = document.getElementById('keyboard');
        let language = this.currentLang;
        console.log(language);
        let layout = this.layouts;
        let layoutLength = Object.keys(this.layouts).length;
        console.log(layoutLength);
        let row = this.layouts[language];
        let rowLength = Object.keys(this.layouts[language]).length;
        console.log(rowLength);
        for ( let key in layout ) {
            if ( key !== language ) {
                continue
            } else {
                for ( let key in row ) {
                    let lengthRow = row[key][0].length;
                    let divRow = document.createElement(`div`)
                        divRow.classList.add('row');
                    for ( let i = 0; i < lengthRow; i++ ){
                        let string = row[key][0][i];
                        let div = document.createElement('div');
                            div.classList.add('button');
                            div.innerHTML = string;

                            divRow.appendChild(div);
                    }
                keyboard.appendChild(divRow);
                }
            }
        }
    }
}

  keyTrainer.selectLanguage();
  keyTrainer.randChar();



    let bindNextChar = keyTrainer.nextChar.bind(keyTrainer);
    let button = document.getElementById('getNumbChar');
        button.addEventListener('click', bindNextChar);

    let bindKeyboard = keyTrainer.createLayout.bind(keyTrainer);
    let buttonKeyboard = document.getElementById('createKeyboard');
        buttonKeyboard.addEventListener('click', bindKeyboard);
})();
