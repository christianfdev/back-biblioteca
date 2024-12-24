import { sql } from '../db.js';
import { randomUUID } from "crypto";
import 'dotenv/config';

export class Account {
    id;
    name;
    email;
    password;

    constructor({ id, name, email, password }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static async list(){
        return sql`select * from account where deleted_at is null`;      
    }

    static async getAccountByEmail (email){
        return sql`select * from account where email = ${email} and deleted_at is null`;
    }

    static async create (account){
        const accountId = randomUUID();
        const { name, email, password } = account;

        await sql`insert into account (id, name, email, password) VALUES (${accountId}, ${name}, ${email}, ${password})`;
    }

    static async update (accountId, accountUpdated){
        const { name, email, password } = accountUpdated;

        await sql`update account set name = ${name}, email = ${email}, password = ${password} where id = ${accountId}`
    }

    static async delete (accountId){
        await sql`update account set deleted_at = now() where id = ${accountId}`;
    }

}

export default Account;