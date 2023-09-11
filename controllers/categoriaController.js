const { getCategoriasDB, addCategoriaBD, updateCategoriaDB, deleteCategoriaBD, getCategoriaPorCodigoBD } = require ('../usecases/categoriaUseCases');

const getCategorias = async (request,response)=>{
    await getCategoriasDB().then(data => response.status(200).json(data))
    .catch(err=>response.status(400).json({
        status: 'error',
        message : 'erro ao consultar as categorias' + err,
    }))
}

const addCategoria = async(request, response)=>{
    await addCategoriaBD(request.body)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "categoria criada",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const updateCategoria = async(request, response)=>{
    await updateCategoriaDB(request.body)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "categoria alterada",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const deleteCategoria = async(request, response)=>{
    await deleteCategoriaBD(request.params.codigo)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "categoria removida",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const getCategoriaPorCodigo = async(request, response)=>{
    await getCategoriaPorCodigoBD(request.params.codigo)
                .then(data => response.status(200).json(data))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

module.exports = {
    getCategorias, 
    addCategoria, 
    updateCategoria, 
    deleteCategoria,
    getCategoriaPorCodigo};