const { getUsuariosDB, addUsuarioDB, updateUsuarioDB, deleteUsuarioDB, getUsuarioPorEmailDB } = require('../usecases/usuarioUseCases');

const getUsuarios = async (request, response) => {
    try {
        const usuarios = await getUsuariosDB();
        response.status(200).json(usuarios);
    } catch (err) {
        response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os Usuários: ' + err,
        });
    }
};

const addUsuario = async (request, response) => {
    try {
        const novoUsuario = await addUsuarioDB(request.body);
        response.status(201).json({
            status: 'success',
            message: 'Usuário criado com sucesso',
            objeto: novoUsuario,
        });
    } catch (err) {
        response.status(400).json({
            status: 'error',
            message: 'Erro ao criar o Usuário: ' + err,
        });
    }
};

const updateUsuario = async (request, response) => {
    try {
        const usuarioAtualizado = await updateUsuarioDB(request.body);
        response.status(200).json({
            status: 'success',
            message: 'Usuário atualizado com sucesso',
            objeto: usuarioAtualizado,
        });
    } catch (err) {
        response.status(400).json({
            status: 'error',
            message: 'Erro ao atualizar o Usuário: ' + err,
        });
    }
};

const deleteUsuario = async (request, response) => {
    try {
        const resultado = await deleteUsuarioDB(request.params.codigo);
        response.status(200).json({
            status: 'success',
            message: 'Usuário removido com sucesso',
            objeto: resultado,
        });
    } catch (err) {
        response.status(400).json({
            status: 'error',
            message: 'Erro ao remover o Usuário: ' + err,
        });
    }
};

const getUsuarioPorCodigo = async (request, response) => {
    try {
        const usuario = await getUsuarioPorEmailDB(request.params.codigo);
        response.status(200).json(usuario);
    } catch (err) {
        response.status(400).json({
            status: 'error',
            message: 'Erro ao buscar o Usuário: ' + err,
        });
    }
};

module.exports = {
    getUsuarios,
    addUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioPorCodigo,
};
