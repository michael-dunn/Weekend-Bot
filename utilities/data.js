const db = require('quick.db');

const defaultDay = { players: [] };
const defaultPlayer = { playerId: null, drinks: [], currentDrink: 'undefined' };

function getDayData(guildId, dayId) {
    var dayData = db.get(`${guildId}.${dayId}`);
    if (dayData != null)
        return dayData;
    return saveDayData(guildId, dayId, defaultDay);
}

function saveDayData(guildId, dayId, data) {
    db.set(`${guildId}.${dayId}`, data);
    return db.get(`${guildId}.${dayId}`);
}

function getPlayerData(guildId, dayId, playerModel) {
    var day = getDayData(guildId, dayId);

    var player = day.players.find(x => x.playerId == playerModel.playerId);
    if (player != null)
        return player;

    return addPlayer(guildId, dayId, playerModel);
}

function savePlayerData(guildId, dayId, data) {
    var day = getDayData(guildId, dayId);
    var playerData = getPlayerData(guildId, dayId, data);

    var playerIndex = day.players.findIndex(x => x.playerId == playerData.playerId);
    day.players[playerIndex] = data;
    saveDayData(guildId, dayId, day);
}

function addPlayer(guildId, dayId, playerModel) {
    var day = getDayData(guildId, dayId);
    var player = defaultPlayer;
    player.playerId = playerModel.playerId;
    player.playerName = playerModel.playerName;
    day.players.push(player);

    saveDayData(guildId, dayId, day);
    return player;
}

function setPlayerDrink(guildId, dayId, playerModel, drinkName) {
    var player = getPlayerData(guildId, dayId, playerModel);
    if (player != null) {
        player.currentDrink = drinkName;
        savePlayerData(guildId, dayId, player);
    }
}

function addDrinkToPlayer(guildId, dayId, playerModel) {
    var player = getPlayerData(guildId, dayId, playerModel);
    if (player != null) {
        player.drinks.push({ 'timeStamp': new Date(), 'drinkName': player.currentDrink });
        savePlayerData(guildId, dayId, player);
    }
}

function removeAllDrinksFromDay(guildId, dayId) {
    var day = getDayData(guildId, dayId);

    for (var player of day.players) {
        player.drinks = [];
    }

    saveDayData(guildId, dayId, day);
}

function getPlayerDrinkCount(guildId, dayId, playerModel) {
    var player = getPlayerData(guildId, dayId, playerModel);

    var drinkNamesList = Array.from(new Set(player.drinks.map(d => d.drinkName)));
    return drinkNamesList.map(n=> { return {drinkName: n, count: player.drinks.filter(d=>d.drinkName == n).length};});
}

function getAllPlayerDrinkCounts(guildId, dayId){
    var day = getDayData(guildId, dayId);

    return day.players.map(p => { return {playerName: p.playerName, drinkCounts: getPlayerDrinkCount(guildId, dayId, {playerId: p.playerId,playerName:p.playerName})};});
}

function getPlayerDrinkCountSince(dateTime, guildId, dayId, playerModel) {
    var player = getPlayerData(guildId, dayId, playerModel);

    var drinks = player.drinks.filter(d=> new Date(d.timeStamp) > dateTime);

    return drinks.length;
}

module.exports = {
    setPlayerDrink: setPlayerDrink,
    addDrinkToPlayer: addDrinkToPlayer,
    removeAllDrinksFromDay: removeAllDrinksFromDay,
    getPlayerDrinkCount: getPlayerDrinkCount,
    getAllPlayerDrinkCounts: getAllPlayerDrinkCounts,
    getPlayerDrinkCountSince: getPlayerDrinkCountSince,
}