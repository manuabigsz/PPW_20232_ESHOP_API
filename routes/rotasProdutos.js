const { Router } = require('express');
const {getProdutos, addProduto, updateProduto, deleteProduto, getProdutoPorCodigo} = require('../controllers/produtosController');

const rotasProduto = new Router();

rotasProduto.route('/produto')
            .get(getProdutos)
            .post(addProduto)
            .put(updateProduto)

rotasProduto.route('/produto/:codigo')
                .delete(deleteProduto)
                .get(getProdutoPorCodigo)

module.exports = {rotasProduto};