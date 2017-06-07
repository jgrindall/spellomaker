
var _ =                 	require("underscore");

var TrickLetterHelper = {
	get:function(text, _upperCase){
		var chars = [], trickChars = [], joined, COMMON_LETTERS, COMMON_DBL_LETTERS, LETTER_PAIRS, numToUse = 3, MIN_TO_USE = 2, MAX_TO_USE = 5;
		COMMON_LETTERS = ["e", "t", "a", "o", "i", "n", "s", "h", "r"];
		COMMON_DBL_LETTERS = ["l", "p", "m", "d", "g", "s", "r", "b", "t"];
		LETTER_PAIRS = [
			["o", "u"],
			["e", "i"],
			["d", "b"],
			["k", "c"],
			["k", "n"],
			["p", "b"],
			["s", "c"],
			["e", "y"]
		];  // often mistaken for each other
		COMMON_LETTERS = 		_.shuffle(COMMON_LETTERS);
		COMMON_DBL_LETTERS = 	_.shuffle(COMMON_DBL_LETTERS);
		LETTER_PAIRS = 			_.shuffle(LETTER_PAIRS);
		if(text){
			text = text.toLowerCase();
			chars = text.split("");
			numToUse = Math.max(MIN_TO_USE, Math.min(MAX_TO_USE, Math.round(text.length/2)));
		}
		// double up all the letters in the word
		_.each(chars, function(c){
			trickChars.push(c);
			trickChars.push(c);
		});
		// add common english letters
		_(MAX_TO_USE).times(function(n){
			trickChars.push(COMMON_LETTERS[n]);
		});
		// check pairs
		_.each(LETTER_PAIRS, function(c){
			if(chars.indexOf(c[0]) >= 0){
				trickChars.push(c[1]);
			}
			if(chars.indexOf(c[1]) >= 0){
				trickChars.push(c[0]);
			}
		});
		// check double letters
		_.each(COMMON_DBL_LETTERS, function(c){
			if(chars.indexOf(c) >= 0){
				trickChars.push(c);
			}
		});
		// choose at random
		trickChars = _.shuffle(trickChars);
		trickChars = _.first(trickChars, numToUse);
		joined = trickChars.join("");
		if(_upperCase){
			joined = joined.toUpperCase();
		}
		return joined;
	}
};

module.exports = TrickLetterHelper;