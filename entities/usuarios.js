class Usuarios {
    constructor(email, senha, tipo, telefone, nome){
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
        this.telefone = telefone;
        this.nome = nome;
    }
}

module.exports = Usuarios;