const fs = require("fs");
const process = require("process");

class SpellChecker {
  constructor(dictionaryPath, wordsToCheckPath) {
    this.dictionaryContent = this.setDictionaryContent(dictionaryPath);
    this.fileContent = this.setFileContent(wordsToCheckPath);
  }

  // load the dictionary file & split into array, breaking on each new line
  setDictionaryContent(file) {
    return new Set(fs.readFileSync(`./${file}`, "utf-8").trim().split("\n"));
  }

  // load the file content and format the words to remove special characters and extra whitespace
  setFileContent(file) {
    return fs.readFileSync(`./${file}`, "utf-8").trim();
  }

  // this needs to be cleaned up as it has a time complexity of O(n^2) due to the nested for loops
  findSimilarWords(misspelledWord) {
    let similarWords = [];

    for (const dictWord of this.dictionaryContent) {
      let similarity = 0;

      // set the min length based on the shorter of the two words
      var minLength =
        misspelledWord.length > dictWord.length
          ? dictWord.length
          : misspelledWord.length;

      // set the max length based on the longer of the two words
      var maxLength =
        misspelledWord.length < dictWord.length
          ? dictWord.length
          : misspelledWord.length;

      // iterage through the two strings and compare each character
      // if the characters match, then increase the similarity score accordingly
      for (var i = 0; i < minLength; i++) {
        if (misspelledWord[i] == dictWord[i]) {
          similarity++;
        }
      }

      // set the score to a percentage that I can check against
      var score = (similarity / maxLength) * 100;
      if (score >= 55) {
        similarWords.push(dictWord);
      }
    }

    return similarWords;
  }

  checkWords() {
    const incorrectWords = [];

    // separate words by spaces
    const words = this.fileContent
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toLowerCase()
      .split(" ");

    for (let i = 0; i < words.length; i++) {
      // iterate through each individual word
      const word = words[i];

      // if a misspelled word and we need to grab line and col data for it
      // using a set allows us to use the Set.has() method which has a time complexity of O(1) and avoids an unnecessary loop if we had to use the Array.includes() method
      if (!this.dictionaryContent.has(word)) {
        // it should start at the beginning of the file and go until it finds the word and then finally it should count how many line breaks there are in that substring; that should be the line number
        // TODO: resolve the line number bug -- currently they are off in the logged results
        const line = this.fileContent.substring(0, word[i]).split("\n").length;

        // track the column of the beginning of the missplelled word
        // TODO: resolve this bug -- currently it is tracking the index of the word itself in the string, not the character
        const column = i - this.fileContent.lastIndexOf(word, i - 1);

        // surrounding context of the misspelled word
        // TODO: resolve this bug -- not showing the proper context surrounding the misspelled word
        const context = this.fileContent.substring(i, i + 20) + "...";

        // find similar words for the misspelled word
        const similarWords = this.findSimilarWords(word);

        incorrectWords.push({
          word,
          line,
          column,
          context: context.trim(),
          possible_matches: similarWords,
        });
      }
    }

    return incorrectWords;
  }

  logErrors() {
    const misspelledWords = this.checkWords();
    console.table(misspelledWords);
  }
}

/*
=================================================================
MAIN PROGRAM
=================================================================
 */
// normalize the arguments passed into the node cli command
const args = process.argv.splice(2);
// create a new instance of the spellchecker constructor
const spellcheck = new SpellChecker(args[0], args[1]);
// call the print method from the spellchecker instance we just created
spellcheck.logErrors();

// ================================================================
// ================================================================
// ================================================================
// ================================================================
// const lines = this.fileContent.split("\n").length;
// const lineCount = this.getLineCount();
