
const seasonLengths = [7, 10, 15, 13, 12, 14, 13, 10, 10, 10, 10, 10, 10, 10, 8];

function getEpisode() {
    var season = Math.floor(Math.random() * seasonLengths.length);

    var episode = Math.floor(Math.random() * (seasonLengths[season]+1))+1;

    return { season: season+1, episode: episode };
}

module.exports = getEpisode;