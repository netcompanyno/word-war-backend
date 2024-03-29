"use strict";

module.exports = function (dictionary, letterEntries) {
  var currentLetters = [];
  var takenWords = {};

  function verifyLetters(word) {
    word = word.toLowerCase();
    var letters = word.split('').sort();

    var l = 0;
    var cl = 0;
    var numberOfLetters = letters.length;
    var numberOfCurrentLetters = currentLetters.length;

    while (l < numberOfLetters && cl < numberOfCurrentLetters) {
      if (letters[l] === currentLetters[cl]) {
        l++;
      }
      cl++;
    }

    return l === numberOfLetters;
  }

  function valueWord(word) {

    if (!word) {
      return 0;
    }

    var score = 0;

    var numberOfLetters = word.length;

    for (var i = 0; i < numberOfLetters; i++) {
      score += getLetterScore(word[i]);
    }

    return score;
  }

  function validWord(word) {
    return dictionary[word.toUpperCase()];
  }

  function getWordClass(word) {
    return dictionary[word.toUpperCase()];
  }

  function wordTaken(word) {
    return takenWords[word] || false;
  }

  function takeWord(word) {
    takenWords[word] = true;
  }

  function changeLetters(letterCount) {
    var randomLetters = _getRandomLetters(letterCount);
    takenWords = {};
    currentLetters = randomLetters.slice(0);
    currentLetters.sort();
    return randomLetters;
  }

  function getCurrentLetters() {
    return currentLetters;
  }

  function getLetterScore(letter) {
    var letterEntry = letterEntries[letter];

    if (!letterEntry) {
      return 0;
    }

    return letterEntry;
  }

  function _getRandomLetters(letterCount) {
    var letterPool = 'aaaaabbcdddeeeeeeeeeeeeffggghiiiiijkkklllllmmmnnnnnnnooooppq' +
      'rrrrrrrsssssstttttttuuvvwxyzæøåå';
    var randomLetters = [];
    var letterPoolLength = letterPool.length;

    for (; letterCount--;) {
      randomLetters.push(letterPool.substr(letterPoolLength * Math.random(), 1));
    }

    return randomLetters;
  }

  return {
    verifyLetters: verifyLetters,
    validWord: validWord,
    getWordClass: getWordClass,
    valueWord: valueWord,
    wordTaken: wordTaken,
    takeWord: takeWord,
    changeLetters: changeLetters,
    getCurrentLetters: getCurrentLetters,
    getLetterScore: getLetterScore
  };
};
