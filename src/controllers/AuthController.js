import { randomUUID } from "crypto";
import { sql } from '../db.js';
import 'dotenv/config';


export class AuthController {

    async list(){

           return sql`select * from account where deleted_at is null`;
       
    }

    async create (account){

        const accountId = randomUUID();

        const { nome, email, senha } = account;

        await sql`insert into account (id, nome, email, senha) VALUES (${accountId}, ${nome}, ${email}, ${senha})`;

    }

    async update (accountId, accountUpdated){
        
        const { nome, email, senha } = accountUpdated;

        await sql`update account set nome = ${nome}, email = ${email}, senha = ${senha} where id = ${accountId}`

    }

    async delete (accountId){

        await sql`update account set deleted_at = now() where id = ${accountId}`;

    }
}