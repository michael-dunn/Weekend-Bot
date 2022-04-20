const axios = require('axios')

var deckId = 'new';

function nextCard() {
    return axios
        .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => {
            deckId = res.data.deck_id;
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