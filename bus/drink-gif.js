const drinkGifUrls = [
    'https://media4.giphy.com/media/E3L5goMMSoAAo/giphy.gif?cid=790b76113e00666fefaf8d81cd690b78f35e185eeb6d6b2c&rid=giphy.gif&ct=g',
    'https://media4.giphy.com/media/e6TR9n00dL3JS/giphy.gif?cid=790b7611caf2382b43ab091aed67202eebad55ffc6e7990e&rid=giphy.gif&ct=g',
    'https://media0.giphy.com/media/CL75lzAA8Aais/giphy.gif?cid=790b7611a2485524fd0a82320882365a0ea6a4d2da7bab14&rid=giphy.gif&ct=g',
    'https://media2.giphy.com/media/IgpAALi5hEv1IFmCrZ/giphy.gif?cid=790b761175517766bc2ce6f8186860d0c4d660a98e23b878&rid=giphy.gif&ct=g',
    'https://media2.giphy.com/media/3osxYwRanhYxKBohvG/giphy.gif?cid=790b76114b566cdd8b89287bd73ab26e7273a358d5907e64&rid=giphy.gif&ct=g'
]

module.exports = () => {
    return drinkGifUrls[Math.floor(Math.random()*drinkGifUrls.length)];
}