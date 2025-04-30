import { User } from "../models/User.js";
import { verifyPassword } from "../utils/hashFunctions.js";
import { sql } from "../db.js";
import jwt from 'jsonwebtoken';

export class UserController {

    async login(email, password) {

        const user = await User.getUserByEmail(email);

        if(!user || !await verifyPassword(password, user[0].password)) return null;

        const token = jwt.sign(
            { id: user[0].id, email: user[0].email, role: user[0].role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        await sql`INSERT INTO sessions (user_account_id, token, expires_at) VALUES (${user[0].id}, ${token}, ${Date.now() + 1000 * 60 * 60})`;

        return token;
    }

    async list() {
        return await User.list();
    }

    async create(user) {
        return await User.create(user);
    }

    async update(userId, userUpdated) {
        return await User.update(userId, userUpdated);
    }

    async delete(userId) {
        return await User.delete(userId);
    }
}