const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/home')

//ROTAS DA HOME
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);

module.exports = route