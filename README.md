# Overview

Write a program that checks spelling. The input to the program is a dictionary file containing a list of valid words and a file containing the text to be checked.
You can use the `dictionary.txt` file included here as your dictionary.

---

# Running the program

1. Update the contents of `file-to-check.txt` with whatever content you want to spell check.
1. In your terminal, run `node josh-allan-spellchecker dictionary.txt file-to-check.txt`.
1. The output of the spell checker should look as follows:

| index | word  | line | column | context                   | possible_matches                          |
| ----- | ----- | ---- | ------ | ------------------------- | ----------------------------------------- |
| 0     | 'ths' | 1    | 1      | 'Ths is an eample of ...' | [ 'ohs', 'tas', 'the', ... 3 more items ] |

---

## Retro

This ended up being more complicated than I had anticipated when first starting on it.

I was able to make quick work of the initial setup of passing in the arguments via node and reading/loading corresponding files. And I quickly realized that using a class component was going to be the easiest way to keep this code clean and simple to follow.

The main area where I got stuck, however, was correctly grabbing the line, column, and surrounding context of the misspelled words. I tried a number of solutions, but kept hitting a wall with it. After messing around with it for far longer than I had hoped, I decided to mark the logic for those three values as a known bug, and move on.

In my previous role, I had some exposure to vendor matching logic based on vendor name/address/contact info. So I pulled from that experience to create a very simple/rudimentary `findSimilarWords()` method to add to the logic. It's not production ready, but it at least provides some basic functionality with some possible dictionary matches for the misspelled words. The biggest flaw is that there is a nested loop in there, so the time complexity of this method is O(n^2). I'm sure it could be improved by implementing a proper data structure, but time got the best of me and I couldn't deliver on that in the current iteration.

Unfortunately, I was unable to make it to the final feature request: Handling proper nouns correctly. I'm currently converting the words to lowercase as I iterate through them and check to see if they are in the dictionary, so I would have to do some adjustments there.

---

## The Features

- [x] The program outputs a list of incorrectly spelled words.
- [x] For each misspelled word, the program outputs a list of suggested words.
- [-] The program includes the line and column number of the misspelled word
- [-] The program prints the misspelled word along with some surrounding context.
- [ ] The program handles proper nouns (person or place names, for example) correctly.
