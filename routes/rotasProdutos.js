const { Router } = require('express');
const {getProdutos, addProduto, updateProduto, deleteProduto, getProdutoPorCodigo} = require('../controllers/produtosController');
const { verificaJWT } = require('../controllers/segurancaController')

const rotasProduto = new Router();

rotasProduto.route('/produto')
            .get(getProdutos)
            .post(verificaJWT,addProduto)
            .put(verificaJWT,updateProduto)

rotasProduto.route('/produto/:codigo')
                .delete(verificaJWT,deleteProduto)
                .get(verificaJWT,getProdutoPorCodigo)

module.exports = {rotasProduto};