import { UserController } from "../controllers/UserController.js";
import checkSuperAdmin from "../middlewares/checkSuperAdmin.js";
import verifySession from "../middlewares/verifySession.js";
import { hashPassword } from "../utils/hashFunctions.js";
import { sql } from "../db.js";

export default async function userRoutes(fastify, options){

    const user = new UserController();

    fastify.get('/users', { preHandler: [verifySession, checkSuperAdmin] }, async (request, reply) => {
        const users = await user.list();
        reply.send({ message: 'Acesso permitido, você é superadmin!', users });
        return users;
    });

    fastify.get('/me', { preHandler: [verifySession] }, async (request, reply) => {
        const userId = request.user.id;
    
        const userAccount = await sql`SELECT id, name, email, role FROM user_account WHERE id = ${userId} AND deleted_at IS NULL`;
    
        if (!userAccount[0]) {
            return reply.status(404).send({ error: 'Usuário não encontrado' });
        }
    
        return {
            id: userAccount[0].id,
            name: userAccount[0].name,
            email: userAccount[0].email,
            role: userAccount[0].role
        };
    });

    fastify.post('/login', {
        schema: {
            body: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', minLength: 6 }
                }
            }
        }
    },async (request, reply) => {
        const { email, password } = request.body;

        const token = await user.login(email, password);

        if(!token) {
            return reply.status(401).send({ error: 'Usuário ou senha inválidos' });
        }
        return { token };
    });

    fastify.post('/logout', async (request, reply) => {
        const authHeader = request.headers.authorization;
        if(!authHeader){
            return reply.status(401).send({ error: 'Token not found' });
        }
        
        const token = authHeader.split(' ')[1];

        if(!token) return reply.status(401).send({error: 'Token inexistente'});

        await sql`DELETE FROM sessions WHERE token = ${token}`;

        reply.send({message: 'Logout realizado com sucesso'});
    });

    fastify.post('/users', async (request, reply) => {
        const { name, email, password } = request.body;

        await user.create({
            name, 
            email, 
            password: await hashPassword(password)
        })
        return reply.status(201).send();
    });
  
    fastify.put('/users/:id', async (request, reply) => {
        const { name, email, password } = request.body;

        await user.update(request.params.id,{
            name, 
            email, 
            password
        })
        return reply.status(201).send();
    });
  
    fastify.delete('/users/:id', async (request, reply) => {
        await user.delete(request.params.id);
        
    });
}