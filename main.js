#! /usr/bin/env node
import inquirer from "inquirer";
const words = [
    "typescript",
    "javascript",
    "nodejs",
    "python",
    "sql",
    "html",
    "java",
];
let condition = true;
while (condition) {
    const getRandomWord = () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    };
    const displayWord = (word, guessedLetters) => {
        let display = "";
        for (const letter of word) {
            if (guessedLetters.has(letter)) {
                display += letter;
            }
            else {
                display += "_";
            }
        }
        return display;
    };
    console.log("Welcome to the Word Guessing Game!");
    const word = getRandomWord();
    const guessedLetters = new Set();
    let attempts = 6;
    while (attempts > 0) {
        const display = displayWord(word, guessedLetters);
        console.log(`\nWord: ${display} Word length is: ${display.length}`);
        console.log(`Attempts left: ${attempts}`);
        console.log(`Guessed letters: ${Array.from(guessedLetters).join(", ")}`);
        const answer = await inquirer.prompt({
            type: "input",
            name: "letter",
            message: "Guess a letter:",
            validate: (input) => {
                if (input.length !== 1 || !/[a-zA-Z]/.test(input)) {
                    return "Please enter a single letter.";
                }
                if (guessedLetters.has(input.toLowerCase())) {
                    return "You already guessed that letter.";
                }
                return true;
            },
        });
        const guessedLetter = answer.letter.toLowerCase();
        guessedLetters.add(guessedLetter);
        if (!word.includes(guessedLetter)) {
            attempts--;
        }
        if (displayWord(word, guessedLetters) === word) {
            console.log(`\nCongratulations! You guessed the word: ${word}`);
            break;
        }
    }
    if (attempts === 0) {
        console.log(`\nGame over! The word was: ${word}`);
    }
    const playAgain = await inquirer.prompt({
        type: "confirm",
        name: "again",
        message: "Do you want to play again?",
        default: true
    });
    condition = playAgain.again;
}
console.log("Thanks for playing!");
