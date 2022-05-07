const db = require('quick.db');
const data = require('./utilities/data');

function clearDB() {
    allRows = db.all();

    for (const row of allRows){
        console.log(`deleting data of id ${row.ID}`);
        db.delete(row.ID);
    }
    allRows = db.all();
}

function allData(){
    var all = db.all();
    console.log(JSON.stringify(all));
}

function test(){
    data.setPlayerDrink(0,20220506,{playerId:1,playerName:'hoverfuse4'},'beer');

    console.log(JSON.stringify(data.getAllPlayerDrinkCounts(0,20220506)));
}


//clearDB();
//test();
//allData();