
const { Router } = require('express');
const {login} = require('../controllers/segurancaController')
const { rotasCategorias } = require('./rotasCategorias');
const { rotasAvaliacoes } = require('./rotasAvaliacoes');
const { rotasProduto } = require('./rotasProdutos');

const rotas = new Router();

rotas.route("/login")
   .post(login);     

rotas.use(rotasCategorias);
rotas.use(rotasAvaliacoes);
rotas.use(rotasProduto);

module.exports = rotas;
