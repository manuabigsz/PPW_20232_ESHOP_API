const { getProdutoDB, addProdutoDB, updateProdutoDB, deleteProdutoDB, getProdutoPorIdDB } = require ('../usecases/produtoUseCases');

const getProdutos = async (request,response)=>{
    await getProdutoDB().then(data => response.status(200).json(data))
    .catch(err=>response.status(400).json({
        status: 'error',
        message : 'erro ao consultar as Produtos' + err,
    }))
}

const addProduto = async(request, response)=>{
    await addProdutoDB(request.body)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "Produto criada",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const updateProduto = async(request, response)=>{
    await updateProdutoDB(request.body)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "Produto alterada",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const deleteProduto = async(request, response)=>{
    await deleteProdutoDB(request.params.codigo)
                .then(data => response.status(200)
                .json({status : "success",
                    message: "Produto removida",
                    objeto: data,
                }))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

const getProdutoPorCodigo = async(request, response)=>{
    await getProdutoPorIdDB(request.params.codigo)
                .then(data => response.status(200).json(data))
                .catch(err=>response.status(400).json({
                    status: 'error',
                    message: err,
                }))
}

module.exports = {
    getProdutos, 
    addProduto, 
    updateProduto, 
    deleteProduto,
    getProdutoPorCodigo};