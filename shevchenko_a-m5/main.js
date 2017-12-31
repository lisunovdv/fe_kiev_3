'use strict';

(() => {
	const alphabets = ['qwertyuiop[]asdfghjkl;\'zxcvbnm,./', 'йцукенгшщзхъфывапролджэячсмитьбю.', 'йцукенгшщзхїфівапролджєячсмитьбю.'];

	let keyboard = {
		layouts: {
			en: {
				topRow: [],
				middleRow: [],
				bottomRow: []
			},
			ru: {
				topRow: [],
				middleRow: [],
				bottomRow: []
			},
			ua: {
				topRow: [],
				middleRow: [],
				bottomRow: []
			}
		},
		langs: ['en', 'ru', 'ua'],
		currentLang: ''
	};

	(function addKeyboardLayout () {
			for (let x = 0; x < alphabets.length; x++) {
				let alphabet = alphabets[x];
	
				for (let i = 0; i < alphabet.length; i++) {
					if (i >= 0 && i < 12) {
						keyboard.layouts[keyboard.langs[x]].topRow.push(alphabet[i]);
					} else if (i >= 12 && i < 23) {
						keyboard.layouts[keyboard.langs[x]].middleRow.push(alphabet[i]);
					} else {
						keyboard.layouts[keyboard.langs[x]].bottomRow.push(alphabet[i]);
					}
				}
			}
			
		})();

	let userLang = prompt('Choose the language', '0');

	(function choiseOfLanguage (){
		if (!userLang) {
			return;
		} else if (parseInt(userLang) >= 0 && parseInt(userLang) <= 2) {
			keyboard.currentLang = keyboard.langs[userLang];
			console.log(keyboard.currentLang);		//output of the selected language
		} else {
			alert ('You are choosed wrong language, try again');
			choiseOfLanguage();
		}
	})();

	function addRandomIndex (max) {
		return Math.floor(Math.random() * max);

	};

	function getRandCharInAlph () {
		return alphabets[userLang][addRandomIndex(alphabets.length)];
	}

	console.log(getRandCharInAlph());		//output a random letter from the selected language

})();
