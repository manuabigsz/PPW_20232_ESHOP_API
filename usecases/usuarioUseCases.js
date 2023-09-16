const { pool } = require('../config');
const Usuarios = require('../entities/usuarios');

const getUsuariosDB = async () => {
    try { 
        const { rows } = await pool.query(`SELECT * FROM usuarios ORDER BY nome`);
        return rows.map((usuario) => new Usuarios(
            usuario.email,
            usuario.senha,
            usuario.tipo,
            usuario.telefone,
            usuario.nome
        ));
    } catch (err) {
        throw "Erro: " + err;
     }
}

const addUsuarioDB = async (body) => {
    try {
        const { email, senha, tipo, telefone, nome } = body;
        const results = await pool.query(`
            INSERT INTO usuarios (email, senha, tipo, telefone, nome) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING email, senha, tipo, telefone, nome`,
            [email, senha, tipo, telefone, nome]
        );
        const usuario = results.rows[0];
        return new Usuarios(
            usuario.email,
            usuario.senha,
            usuario.tipo,
            usuario.telefone,
            usuario.nome
        );
    } catch (err) {
        throw "Erro ao inserir o usuário: " + err;
    }
}

const updateUsuarioDB = async (body) => {
    try {
        const { email, senha, tipo, telefone, nome } = body;
        const results = await pool.query(`
            UPDATE usuarios 
            SET senha = $2, tipo = $3, telefone = $4, nome = $5
            WHERE email = $1
            RETURNING email, senha, tipo, telefone, nome`,
            [email, senha, tipo, telefone, nome]
        );
        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o email ${email} para ser atualizado`;
        }
        const usuario = results.rows[0];
        return new Usuarios(
            usuario.email,
            usuario.senha,
            usuario.tipo,
            usuario.telefone,
            usuario.nome
        );
    } catch (err) {
        throw "Erro ao atualizar o usuário: " + err;
    }
}

const deleteUsuarioDB = async (email) => {
    try {
        const results = await pool.query(`DELETE FROM usuarios WHERE email = $1`, [email]);
        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o email ${email} para ser removido`;
        } else {
            return 'Usuário removido com sucesso';
        }
    } catch (err) {
        throw "Erro ao remover o usuário: " + err;
    }
}

const getUsuarioPorEmailDB = async (email) => {
    try {
        const results = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);
        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o email ${email}`;
        } else {
            const usuario = results.rows[0];
            return new Usuarios(
                usuario.email,
                usuario.senha,
                usuario.tipo,
                usuario.telefone,
                usuario.nome
            );
        }
    } catch (err) {
        throw "Erro ao buscar o usuário: " + err;
    }
}

module.exports = {
    getUsuariosDB,
    addUsuarioDB,
    updateUsuarioDB,
    deleteUsuarioDB,
    getUsuarioPorEmailDB
};
