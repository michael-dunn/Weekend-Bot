const cardClient = require('./card-client');

var cards = [{ suit: "HEARTS", value: "KING" }];
var gameStep = '';
//https://deckofcardsapi.com/

function newGame() {
    gameStep = 'Color';
    return [{ val: 'first', label: 'Red' }, { val: 'second', label: 'Black' }];
}

function restartGame() {
    gameStep = 'Color'
    cards = [];
    return [{ val: 'first', label: 'Red' }, { val: 'second', label: 'Black' }];
}

function drawNextCard() {
    cardClient.nextCard().then(res => {
        cards.push({ suit: res[0].suit, value: res[0].value });
        console.log(cards);
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
    console.log(`${first} ${second} ${givenNum}`);
    if (first > second)
        return first > givenNum && givenNum > second;
    else
        return second > givenNum && givenNum > first;
}

function next(buttonChosen) {
    if (gameStep == 'Color') {
        if (buttonChosen == 'first') { //Red
            if (['HEARTS', 'DIAMONDS'].includes(cards[0].suit)) {
                drawNextCard();
                gameStep = 'Higher or Lower';
                return [{ val: 'first', label: 'Higher' }, { val: 'second', label: 'Lower' }];
            }
        }
        else if (buttonChosen == 'second') { //Black
            if (['SPADES', 'CLUBS'].includes(cards[0].suit)) {
                drawNextCard();
                gameStep = 'Higher or Lower';
                return [{ val: 'first', label: 'Higher' }, { val: 'second', label: 'Lower' }];
            }
        }
        console.log('loser');
        return restartGame();
    }
    else if (gameStep == 'Higher or Lower') {
        if (buttonChosen == 'first') { //Higher
            if (convertToNumber(cards[0].value) < convertToNumber(cards[1].value)) {
                drawNextCard();
                gameStep = 'Outside or Between';
                return [{ val: 'first', label: 'Outside' }, { val: 'second', label: 'Between' }];
            }
        }
        else if (buttonChosen == 'second') { //Lower
            if (convertToNumber(cards[0].value) > convertToNumber(cards[1].value)) {
                drawNextCard();
                gameStep = 'Outside or Between';
                return [{ val: 'first', label: 'Outside' }, { val: 'second', label: 'Between' }];
            }
        }
        console.log('loser');
        return restartGame();
    }
    else if (gameStep == 'Outside or Between') {
        if (buttonChosen == 'first') { //Outside
            if (!inBetween(convertToNumber(cards[0].value), convertToNumber(cards[1].value), convertToNumber(cards[2].value))) {
                drawNextCard();
                gameStep = 'Suit';
                return [{ val: 'first', label: 'Diamond' }, { val: 'second', label: 'Spade' },{ val: 'third', label: 'Heart' }, { val: 'fourth', label: 'Club' }];
            }
        }
        else if (buttonChosen == 'second') { //Between
            if (inBetween(convertToNumber(cards[0].value), convertToNumber(cards[1].value), convertToNumber(cards[2].value))) {
                drawNextCard();
                gameStep = 'Suit';
                return [{ val: 'first', label: 'Diamond' }, { val: 'second', label: 'Spade' },{ val: 'third', label: 'Heart' }, { val: 'fourth', label: 'Club' }];
            }
        }
        console.log('loser');
        return restartGame();
    }
    else if (gameStep == 'Suit') {
        if (buttonChosen == 'first') { //Diamond
            if (cards[3].suit == 'DIAMONDS'){
                console.log('Winner');
            }
        }
        else if (buttonChosen == 'second') { //Spade
            if (cards[3].suit == 'SPADES'){
                console.log('Winner');
            }
        }
        else if (buttonChosen == 'third') { //Heart
            if (cards[3].suit == 'HEARTS'){
                console.log('Winner');
            }
        }
        else if (buttonChosen == 'fourth') { //Club
            if (cards[3].suit == 'CLUBS'){
                console.log('Winner');
            }
        }
        return restartGame();
    }
}

module.exports = {
    newGame: newGame,
    restartGame: restartGame,
    next: next
}