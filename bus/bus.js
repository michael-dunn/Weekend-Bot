const cardClient = require('./card-client');

var cards = [];
var gameStep = '';
var drinkCounter = 0;

const RedOrBlackGameStep = 'RoB';
const HigherOrLowerGameStep = 'HoL';
const OutsideOrBetweenGameStep = 'OoB';
const SuitsGameStep = 'Suits';
const WinningGameStep = 'Win';

function restartGame(drink) {
    cards = [];
    return RedOrBlack(drink);
}

function newGame() {
    drinkCounter = 0;
    return restartGame(false);
}

function winner() {
    gameStep = WinningGameStep;
    return {
        buttons: [
            { val: 'first', label: 'Yes' },
            { val: 'second', label: 'No' }
        ],
        footer: 'You win! Play again?',
        cards: cards
    };
}

function drawNextCard() {
    cardClient.nextCard().then(res => {
        cards.push({ suit: res[0].suit, value: res[0].value, code: res[0].code });
        console.log(res[0]);
    });
}

function convertToNumber(value) {
    switch (value) {
        case "1":
            return 1;
        case "2":
            return 2;
        case "3":
            return 3;
        case "4":
            return 4;
        case "5":
            return 5;
        case "6":
            return 6;
        case "7":
            return 7;
        case "8":
            return 8;
        case "9":
            return 9;
        case "10":
            return 10;
        case "JACK":
            return 11;
        case "QUEEN":
            return 12;
        case "KING":
            return 13;
        case "ACE":
            return 14;
    }
}

function inBetween(first, second, givenNum) {
    if (first > second)
        return first > givenNum && givenNum > second;
    else
        return second > givenNum && givenNum > first;
}

function RedOrBlack(drink) {
    drawNextCard();
    gameStep = RedOrBlackGameStep;
    if (drink)
        drinkCounter++;
    return {
        buttons: [
            { val: 'first', label: 'Red' },
            { val: 'second', label: 'Black' }
        ],
        footer: 'Red or Black?',
        cards: cards.slice(0, 0),
        drink: drink,
        count: drinkCounter
    };
}

function HigherOrLower() {
    drawNextCard();
    gameStep = HigherOrLowerGameStep;
    return {
        buttons: [
            { val: 'first', label: 'Higher' },
            { val: 'second', label: 'Lower' }
        ],
        footer: 'Higher Or Lower?',
        cards: cards.slice(0, 1)
    };
}

function OutsideOrBetween() {
    drawNextCard();
    gameStep = OutsideOrBetweenGameStep;
    return {
        buttons: [
            { val: 'first', label: 'Outside' },
            { val: 'second', label: 'Between' }
        ],
        footer: 'Outside or Between?',
        cards: cards.slice(0, 2)
    };
}

function Suits() {
    drawNextCard();
    gameStep = SuitsGameStep;
    return {
        buttons: [
            { val: 'first', label: 'Diamond' },
            { val: 'second', label: 'Spade' },
            { val: 'third', label: 'Heart' },
            { val: 'fourth', label: 'Club' }
        ],
        footer: 'Suit?',
        cards: cards.slice(0, 3)
    };
}

function next(buttonChosen) {
    if (gameStep == RedOrBlackGameStep) {
        if (buttonChosen == 'first') { //Red
            if (['HEARTS', 'DIAMONDS'].includes(cards[0].suit)) {
                return HigherOrLower();
            }
        }
        else if (buttonChosen == 'second') { //Black
            if (['SPADES', 'CLUBS'].includes(cards[0].suit)) {
                return HigherOrLower();
            }
        }
        return restartGame(true);
    }
    else if (gameStep == HigherOrLowerGameStep) {
        if (buttonChosen == 'first') { //Higher
            if (convertToNumber(cards[0].value) < convertToNumber(cards[1].value)) {
                return OutsideOrBetween();
            }
        }
        else if (buttonChosen == 'second') { //Lower
            if (convertToNumber(cards[0].value) > convertToNumber(cards[1].value)) {
                return OutsideOrBetween();
            }
        }
        return restartGame(true);
    }
    else if (gameStep == OutsideOrBetweenGameStep) {
        if (buttonChosen == 'first') { //Outside
            if (!inBetween(convertToNumber(cards[0].value), convertToNumber(cards[1].value), convertToNumber(cards[2].value))) {
                return Suits();
            }
        }
        else if (buttonChosen == 'second') { //Between
            if (inBetween(convertToNumber(cards[0].value), convertToNumber(cards[1].value), convertToNumber(cards[2].value))) {
                return Suits();
            }
        }
        return restartGame(true);
    }
    else if (gameStep == SuitsGameStep) {
        if (buttonChosen == 'first') { //Diamond
            if (cards[3].suit == 'DIAMONDS') {
                return winner();
            }
        }
        else if (buttonChosen == 'second') { //Spade
            if (cards[3].suit == 'SPADES') {
                return winner();
            }
        }
        else if (buttonChosen == 'third') { //Heart
            if (cards[3].suit == 'HEARTS') {
                return winner();
            }
        }
        else if (buttonChosen == 'fourth') { //Club
            if (cards[3].suit == 'CLUBS') {
                return winner();
            }
        }
        return restartGame(true);
    }
    else if (gameStep = WinningGameStep) {
        if (buttonChosen == 'first') { //yes
            return restartGame(false);
        }
        else if (buttonChosen == 'second') { //no
            return null;
        }
    }
    return null;
}

module.exports = {
    newGame: newGame,
    next: next
}