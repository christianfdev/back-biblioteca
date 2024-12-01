import jwt from 'jsonwebtoken';

export default async function verifyToken (request, reply) {
    
    try {
        const authHeader = request.headers.authorization;
        if(!authHeader){
            return reply.status(401).send({ error: 'Token not found' });
        }
        
        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        request.user = decoded;

    } catch (err) {
        return reply.status(401).send({ error: 'Token inválido' });
    }

}