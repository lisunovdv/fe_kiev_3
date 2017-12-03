'use strict';

function start() {
  keyTrainer.getLayouts()
    .getCurrentLang()
    .getNumberOfChar()
    .getRandCharInAlph()
    .nextChar();
};

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

  getNumberOfChar: function() {
    let num = prompt('Please enter number of characters you would like to train:');

    if (num == null) {
      return;
    } else if (num != '' && num > 0 && Number.isInteger(+num)) {
      this.numberOfCharacters = num;
    } else {
      alert('Please, enter the real number of characters that you would like to train');
      this.getNumberOfChar();
    };

    return this;
  },

  getRandCharInAlph: function() {
    let choosenLang = this.layouts[this.currentLang];
    let letters = [];
    let rand;

    for (let key in choosenLang) {
      letters = letters.concat(choosenLang[key]);
    };

    for (let i = 1; i <= this.numberOfCharacters; i++) {
      rand = letters[Math.floor(Math.random() * letters.length)];
      this.randChars.push(`${rand}`);
    };

    // console.log(`Characters in "${this.currentLang}" language that you will train is "${this.randChars}"`);
    return this;
  },

  nextChar: function() {
    let trainingChar,
      mistakes = 0;

    if (confirm(`Will we start training? Check that the "${this.currentLang}" keyboard layout is set`)) {
      for (let i = 0; i < this.randChars.length; i++) {
        console.log(this.randChars[i]);
        trainingChar = prompt(`Enter the letter - ${this.randChars[i]}`);

        if (trainingChar == null) {
          let stop = confirm(`Do you want to stop training?`);

          if (!stop) {
            i -= 1;
          } else {
            return this;
          };

        } else if (trainingChar !== this.randChars[i]) {
          mistakes++;
        };
      };

      if (confirm(`Good Job! You made ${mistakes} mistakes. Try again?`) == true) {
        this.randChars.splice(0, this.randChars.length);
        start();
      } else {
        return this;
      };

    };

    return this;
  },
};

start();
