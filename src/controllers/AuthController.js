import { Account } from "../models/Account.js";
import { verifyPassword } from "../utils/hashFunctions.js";
import { sql } from "../db.js";
import jwt from 'jsonwebtoken';



export class AuthController {

    async login(email, senha) {

        const account = await Account.getAccountByEmail(email);

        if(!account || !await verifyPassword(senha, account[0].senha)) return null;

        const token = jwt.sign(
            { id: account[0].id, email: account[0].email, role: account[0].role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        await sql`INSERT INTO sessions (account_id, token, expires_at) VALUES (${account[0].id}, ${token}, ${Date.now() + 1000 * 60 * 60})`;

        return token;
    }


    async list() {
        return await Account.list();
    }

    async create(account) {
        return await Account.create(account);
    }

    async update(accountId, accountUpdated) {
        return await Account.update(accountId, accountUpdated);
    }

    async delete(accountId) {
        return await Account.delete(accountId);
    }
}