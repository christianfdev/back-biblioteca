import { sql } from "../db.js";
import jwt from 'jsonwebtoken';
export default async function verifySession (request, reply) {
    
    try {
        const authHeader = request.headers.authorization;
        if(!authHeader){
            return reply.status(401).send({ error: 'Token not found' });
        }
        
    const token = authHeader.split(' ')[1];


    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    console.log(decoded)
    request.user = decoded;

    

    const session = await sql`SELECT 1 FROM sessions WHERE token = ${token} AND expires_at > NOW()`;

  
    if (session.length === 0) {
        return reply.status(401).send({ error: 'Sessão inválida ou expirada' });
    }

    } catch (error) {
        return reply.status(401).send({ error: 'Token inválido' });
    }
    

}