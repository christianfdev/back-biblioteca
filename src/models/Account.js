
export class Account {
    id;
    nome;
    email;
    senha;

    constructor({ id, nome, email, senha }) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }


    

}

export default Account;