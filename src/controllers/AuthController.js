import { Account } from "../models/Account.js";

import jwt from 'jsonwebtoken';

import { verifyPassword } from "../utils/hashFunctions.js";

export class AuthController {

    async login(email, senha) {

        const account = await Account.getAccountByEmail(email);

        if(!account || !await verifyPassword(senha, account[0].senha)) return null;

        const token = jwt.sign(
            { id: account[0].id, email: account[0].email, role: account[0].role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
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