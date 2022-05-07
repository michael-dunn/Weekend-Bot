const drinkGifUrls = [
    'https://media4.giphy.com/media/E3L5goMMSoAAo/giphy.gif?cid=790b76113e00666fefaf8d81cd690b78f35e185eeb6d6b2c&rid=giphy.gif&ct=g',
    'https://media4.giphy.com/media/e6TR9n00dL3JS/giphy.gif?cid=790b7611caf2382b43ab091aed67202eebad55ffc6e7990e&rid=giphy.gif&ct=g',
    'https://media0.giphy.com/media/CL75lzAA8Aais/giphy.gif?cid=790b7611a2485524fd0a82320882365a0ea6a4d2da7bab14&rid=giphy.gif&ct=g',
    'https://media2.giphy.com/media/IgpAALi5hEv1IFmCrZ/giphy.gif?cid=790b761175517766bc2ce6f8186860d0c4d660a98e23b878&rid=giphy.gif&ct=g',
    'https://media2.giphy.com/media/3osxYwRanhYxKBohvG/giphy.gif?cid=790b76114b566cdd8b89287bd73ab26e7273a358d5907e64&rid=giphy.gif&ct=g',
    'https://media3.giphy.com/media/1BXa2alBjrCXC/200w.webp?cid=ecf05e47u1g3roxnp3jqka0m3olc09as5xpns0rmcs52icj6&rid=200w.webp&ct=g',
    'https://media0.giphy.com/media/xT8qBwd76TCzUrCP84/200w.webp?cid=ecf05e47u1g3roxnp3jqka0m3olc09as5xpns0rmcs52icj6&rid=200w.webp&ct=g',
    'https://media0.giphy.com/media/lqMg6hf8Mie9cvsrmi/200w.webp?cid=ecf05e47u1g3roxnp3jqka0m3olc09as5xpns0rmcs52icj6&rid=200w.webp&ct=g',
    'https://media4.giphy.com/media/KylMzku5T57A4/200.webp?cid=ecf05e47x8x1d6vsku7veasocl4ufaj9jl8lilpl7a89x1g1&rid=200.webp&ct=g',
    'https://media3.giphy.com/media/TpLVBrlAspLR4H4Flj/200w.webp?cid=ecf05e47pxw5s3elbtndszlkcoy0rlt5y24l526kz8ev4j6z&rid=200w.webp&ct=g',
    'https://media0.giphy.com/media/K34FVrUx8ggyA/giphy.webp?cid=ecf05e47pxw5s3elbtndszlkcoy0rlt5y24l526kz8ev4j6z&rid=giphy.webp&ct=g',
    'https://media0.giphy.com/media/Av1ogAiI3H2xA1P0al/200.webp?cid=ecf05e47d5cq1d1t8a2p2xfxavqfdr1taid6dh7tidqjsq8y&rid=200.webp&ct=g',
    'https://media3.giphy.com/media/u9QoHec9uGfq8/200w.webp?cid=ecf05e47oqxi4lsd38z1pih9yx7akxalzy6w161mbgc7eijx&rid=200w.webp&ct=g',
    'https://media4.giphy.com/media/BcyP1Rx3O7zpu/200w.webp?cid=ecf05e47q6inxfl2n31e65dabz1rq13hsr1s1391zfbdrzp3&rid=200w.webp&ct=g',
    'https://media2.giphy.com/media/icPNQ6OuRtlew/200.webp?cid=ecf05e475gyfw43ox0cdv9ggo8vddupbdbljo347ovhllo96&rid=200.webp&ct=g',
    'https://media4.giphy.com/media/jUuPJRDlJMRFTc1lJh/200w.webp?cid=ecf05e473png1xx732nepv86lrgwd2izrq8nv1fspdd12eu8&rid=200w.webp&ct=g',
    'https://media1.giphy.com/media/ZczeWkEKpmeKCF8Lpr/200.webp?cid=ecf05e47qw4de98k8w06tovout7ggc7y2ofxdhqpzvlveu80&rid=200.webp&ct=g',
    'https://media1.giphy.com/media/3o7bu5nUwmZqevSHMQ/200w.webp?cid=ecf05e47h4cmkx5in9ixwxfxl0y6chnu8xddsodc6vpdm6ld&rid=200w.webp&ct=g',
]

module.exports = () => {
    return drinkGifUrls[Math.floor(Math.random() * drinkGifUrls.length)];
}