// rotasAvaliacoes.js
const { Router } = require('express');
const { getAvaliacoes, addAvaliacoes, updateAvaliacoes, deleteAvaliacoes, getAvaliacoesPorCodigo } = require('../controllers/avaliacoesController');

const rotasAvaliacoes = new Router();

rotasAvaliacoes.route('/avaliacoes')
  .get(getAvaliacoes)
  .post(addAvaliacoes)
  .put(updateAvaliacoes);

rotasAvaliacoes.route('/avaliacoes/:codigo')
  .delete(deleteAvaliacoes)
  .get(getAvaliacoesPorCodigo);

  module.exports = {rotasAvaliacoes};
