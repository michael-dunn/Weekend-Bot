const util = require('util');
const axios = require('axios');
const url = 'https://api.themoviedb.org/3/tv/2710/season/%s/episode/%s?api_key=af0d6260b052fdf7a6c15fc0f61c5991&language=en-US';
const imagesUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

async function getEpisodeDetail(episode) {
    return await axios
        .get(util.format(url, episode.season, episode.episode))
        .then(res => {
            return { season: episode.season, episode: episode.episode, name: res.data.name, description: res.data.overview, airDate: res.data.air_date, image: imagesUrl+res.data.still_path };
        })
        .catch(error => {
            console.error(error);
        });
}

module.exports = getEpisodeDetail;