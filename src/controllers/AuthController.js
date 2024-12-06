import { Account } from "../models/Account.js";

export class AuthController {

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