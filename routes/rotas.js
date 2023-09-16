const { Router } = require('express');
const { rotasCategorias } = require('./rotasCategorias');
const { rotasAvaliacoes } = require('./rotasAvaliacoes');
const { rotasProduto } = require('./rotasProdutos');
const { rotasUsuarios } = require('./rotasUsuarios'); 

const rotas = new Router();

rotas.use(rotasCategorias);
rotas.use(rotasAvaliacoes);
rotas.use(rotasProduto);
rotas.use(rotasUsuarios);

module.exports = rotas;
