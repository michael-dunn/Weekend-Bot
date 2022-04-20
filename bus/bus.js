
var cards = [{ suit: "HEARTS", value: "KING" }];
var gameStep = '';

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
    cards.push({ suit: "SPADES", value: "8" });
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

        }
        else if (buttonChosen == 'second') { //Between

        }
        gameStep = 'Suit';
    }
    else if (gameStep == 'Suit') {
        if (buttonChosen == 'first') { //Diamond

        }
        else if (buttonChosen == 'second') { //Spade

        }
        else if (buttonChosen == 'third') { //Heart

        }
        else if (buttonChosen == 'fourth') { //Club

        }
        gameStep = '';
    }
}

module.exports = {
    newGame: newGame,
    restartGame: restartGame,
    next: next
}