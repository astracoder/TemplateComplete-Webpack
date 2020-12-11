const express = require('express');
const route = express.Router();
const homeControll = require('./src/controllers/homeControll');

//Route home
route.get('/', homeControll.homePage);
route.post('/', homeControll.trataPage);

module.exports = route;