import { sql } from '../db.js';
import { randomUUID } from "crypto";
import 'dotenv/config';

export class User {
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
        return sql`select * from user_account where deleted_at is null`;      
    }

    static async getUserByEmail (email){
        return sql`select * from user_account where email = ${email} and deleted_at is null`;
    }

    static async create (user){
        const userId = randomUUID();
        const { name, email, password } = user;

        await sql`insert into user_account (id, name, email, password) VALUES (${userId}, ${name}, ${email}, ${password})`;
    }

    static async update (userId, userUpdated){
        const { name, email, password } = userUpdated;

        await sql`update user_account set name = ${name}, email = ${email}, password = ${password} where id = ${userId}`
    }

    static async delete (userId){
        await sql`update user_account set deleted_at = now() where id = ${userId}`;
    }

}
