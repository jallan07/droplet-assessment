const fs = require("fs");
const process = require("process");

class SpellChecker {
  constructor(dictionaryPath, wordsToCheckPath) {
    this.dictionaryArray = this.setDictionaryArray(dictionaryPath);
    this.wordsToCheckArray = this.setWordsToCheckArray(wordsToCheckPath);
  }

  // load the dictionary file & split into array, breaking on each new line
  setDictionaryArray(file) {
    return fs
      .readFileSync(`./${file}`, "utf-8")
      .split("\n")
      .map((line) => line.trim());
  }

  setWordsToCheckArray(file) {
    return fs
      .readFileSync(`./${file}`, "utf-8")
      .split(" ")
      .map((line) => line.trim());
  }

  printResults() {
    // console.log(this.dictionaryArray);
    console.log(this.wordsToCheckArray);
  }
}

/*
=================================================================
MAIN
=================================================================
 */
// normalize the arguments passed into the node cli command
const args = process.argv.splice(2);
// call the spellchecker constructor to create a new instance
const spellcheck = new SpellChecker(args[0], args[1]);
// call the print method from the spellchecker instance we just created
spellcheck.printResults();
