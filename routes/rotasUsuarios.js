const { Router } = require('express');
const { getUsuarios, addUsuario, updateUsuario, deleteUsuario, getUsuarioPorCodigo } = require('../controllers/usuariosController');

const rotasUsuarios = new Router();

rotasUsuarios.route('/usuario')
    .get(getUsuarios)
    .post(addUsuario)
    .put(updateUsuario);

rotasUsuarios.route('/usuario/:codigo')
    .delete(deleteUsuario)
    .get(getUsuarioPorCodigo);

module.exports = {rotasUsuarios};
