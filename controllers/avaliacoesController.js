const { getAvaliacoesDB, addAvaliacaoBD, updateAvaliacaoDB, deleteAvaliacaoBD, getAvaliacaoPorCodigoBD } = require('../usecases/avaliacoesUseCases');

const getAvaliacoes = async (request, response) => {
    try {
        const data = await getAvaliacoesDB();
        response.status(200).json(data);
    } catch (err) {
        response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as categorias',
            error: err,
        });
    }
}

const addAvaliacoes = async (request, response) => {
    try {
        const data = await addAvaliacaoBD(request.body);
        response.status(200).json({
            status: "success",
            message: "Categoria criada",
            objeto: data,
        });
    } catch (err) {
        response.status(400).json({
            status: 'error',
            message: err,
        });
    }
}

const updateAvaliacoes = async (request, response) => {
    try {
        const data = await updateAvaliacaoDB(request.body);
        response.status(200).json({
            status: "success",
            message: "Categoria alterada",
            objeto: data,
        });
    } catch (err) {
        response.status(400).json({
            status: 'error',
            message: err,
        });
    }
}

const deleteAvaliacoes = async (request, response) => {
    try {
        const data = await deleteAvaliacaoBD(request.params.codigo);
        response.status(200).json({
            status: "success",
            message: "Categoria removida",
            objeto: data,
        });
    } catch (err) {
        response.status(400).json({
            status: 'error',
            message: err,
        });
    }
}

const getAvaliacoesPorCodigo = async (request, response) => {
    try {
        const data = await getAvaliacaoPorCodigoBD(request.params.codigo);
        response.status(200).json(data);
    } catch (err) {
        response.status(400).json({
            status: 'error',
            message: err,
        });
    }
}

module.exports = {
    getAvaliacoes,
    addAvaliacoes,
    updateAvaliacoes,
    deleteAvaliacoes,
    getAvaliacoesPorCodigo
};
