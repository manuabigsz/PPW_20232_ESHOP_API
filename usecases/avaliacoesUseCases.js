const { pool } = require('../config');
const Avaliacoes = require('../entities/avaliacoes');

const getAvaliacoesDB = async () => {
    try { 
        const { rows } = await pool.query(`SELECT * FROM avaliacoes ORDER BY email`);
        return rows.map((avaliacao) => new Avaliacoes(avaliacao.codigo, avaliacao.autor, avaliacao.email, avaliacao.texto, avaliacao.nota, avaliacao.data,avaliacao.produto));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addAvaliacaoBD = async (body) => {
    try {
        const { codigo, autor, email, texto, nota, data, produto } = body;
        
        const results = await pool.query(`
            INSERT INTO avaliacoes (codigo, autor, email, texto, nota, data, produto) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING codigo, autor, email, texto, nota, data, produto`,
            [codigo, autor, email, texto, nota, data, produto]
        );
        const avaliacao = results.rows[0];
        return new Avaliacoes(avaliacao.codigo, avaliacao.autor, avaliacao.email, avaliacao.texto, avaliacao.nota, avaliacao.data, avaliacao.produto);
    } catch (err) {
        throw "Erro ao inserir na avaliação: " + err;
    }
}



const updateAvaliacaoDB = async (body) => {
    try {
        const { codigo, autor, email, texto, nota, data, produto } = body;
        const results = await pool.query(`
            UPDATE avaliacoes 
            SET email = $1, autor = $2, texto = $3, nota = $4, data = $5, produto = $6
            WHERE codigo = $7 
            RETURNING codigo, email, texto, nota, data, produto`,
            [email, autor, texto, nota, data, produto, codigo]
        );
        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const avaliacao = results.rows[0];
        return new Avaliacoes(avaliacao.codigo, avaliacao.email, avaliacao.texto, avaliacao.nota, avaliacao.data, avaliacao.produto);
    } catch (err) {
        throw "Erro ao alterar a avaliação: " + err;
    }
}


const deleteAvaliacaoBD = async(codigo) =>{
    try{
       
        const results = await pool.query(`DELETE FROM avaliacoes WHERE 
        codigo = $1 `,[codigo]);
        if(results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`;
        }else{
            return 'Categoria removida com sucesso';
        }
    }catch{
        throw "Erro ao remover categoria: " + err;
    }
}


const getAvaliacaoPorCodigoBD = async (codigo) => {
    try {
        const results = await pool.query(`
            SELECT * FROM avaliacoes 
            WHERE codigo = $1`,
            [codigo]
        );
        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`;
        } else {
            const avaliacao = results.rows[0];
            return new Avaliacoes(avaliacao.codigo, avaliacao.email, avaliacao.texto, avaliacao.nota, avaliacao.data, avaliacao.produto);
        }
    } catch (err) {
        throw "Erro ao buscar avaliação: " + err;
    }
}

module.exports = {
    getAvaliacoesDB,
    addAvaliacaoBD,
    updateAvaliacaoDB,
    deleteAvaliacaoBD,
    getAvaliacaoPorCodigoBD
};
