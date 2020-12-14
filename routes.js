const express = require('express');
const route = express.Router();

const homeControll = require('./src/controllers/homeControll');
const loginControll = require('./src/controllers/loginControll');
const contatoControll = require('./src/controllers/contatoControll');

const { loginRequired } = require('./src/middlewares/middleware');

//Route home
route.get('/', homeControll.index);

//Route login
route.get('/login/index', loginControll.index);
route.post('/login/register', loginControll.register);
route.post('/login/login', loginControll.login);
route.get('/login/logout', loginControll.logout);

//Route contatos
route.get('/contato/index', loginRequired, contatoControll.index);
route.post('/contato/register', loginRequired, contatoControll.register);
route.get('/contato/index/:id', loginRequired, contatoControll.edit);
route.post('/contato/edit/:id', loginRequired, contatoControll.editing);
route.get('/contato/delete/:id', loginRequired, contatoControll.delete);

module.exports = route;