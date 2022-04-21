const axios = require('axios')

var deckId = 'new';

function shuffleDeck() {
    return axios
        .get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
        .then(res => {
            return true;
        })
        .catch(error => {
            console.error(error);
            return false;
        });
}

function nextCard() {
    return axios
        .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => {
            deckId = res.data.deck_id;
            if (res.data.remaining == "4"){
                shuffleDeck();
            }
            return res.data.cards;
        })
        .catch(error => {
            console.error(error);
            return null;
        });
}

module.exports = {
    nextCard: nextCard
}