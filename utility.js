const db = require('quick.db');
const data = require('./utilities/data');
const getEpisodeDetail = require('./utilities/iasip/episode-detail');
const getEpisode = require('./utilities/iasip/episode-selector');
const cardClient = require('./bus/card-client');

function clearDB() {
    allRows = db.all();

    for (const row of allRows) {
        console.log(`deleting data of id ${row.ID}`);
        db.delete(row.ID);
    }
    allRows = db.all();
}

function allData() {
    var all = db.all();
    console.log(JSON.stringify(all));
}

function utilityCommand() {
    //data.addDrinkToPlayer(1, 1, { playerId: 1, playerName: 'test' });
    //data.addDrinkToPlayer(1, 1, { playerId: 1, playerName: 'test' });
    //data.addDrinkToPlayer(1, 1, { playerId: 1, playerName: 'test' });

    var drinks = data.getPlayerDrinkCountSince(new Date(new Date().getTime() - 3 * 60000), 1, 1, { playerId: 1, playerName: 'test' });
    console.log(`${drinks} drinks`);
}
//clearDB();
//utilityCommand();
//allData();