import { sql } from '../db.js';
import { randomUUID } from "crypto";
import 'dotenv/config';

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


    static async list(){

        return sql`select * from account where deleted_at is null`;
           
    }

    static async create (account){

        const accountId = randomUUID();

        const { nome, email, senha } = account;

        await sql`insert into account (id, nome, email, senha) VALUES (${accountId}, ${nome}, ${email}, ${senha})`;

    }

    static async update (accountId, accountUpdated){
        
        const { nome, email, senha } = accountUpdated;

        await sql`update account set nome = ${nome}, email = ${email}, senha = ${senha} where id = ${accountId}`

    }

    static async delete (accountId){

        await sql`update account set deleted_at = now() where id = ${accountId}`;

    }

}

export default Account;