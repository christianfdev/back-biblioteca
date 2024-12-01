import { AuthController } from "../controllers/AuthController.js";
import verifyToken from "../middlewares/verifyToken.js";

import { hashPassword } from "../utils/hashFunctions.js";

export default async function authRoutes(fastify, options){

    const auth = new AuthController();

    fastify.get('/accounts', { preHandler: verifyToken }, async (request) => {
        const accounts = await auth.list();
    
        return accounts;
    });

    fastify.post('/login', {
        schema: {
            body: {
                type: 'object',
                required: ['email', 'senha'],
                properties: {
                    email: { type: 'string', format: 'email' },
                    senha: { type: 'string', minLength: 6 }
                }
            }
        }
    },async (request, reply) => {
        const { email, senha } = request.body;

        const token = await auth.login(email, senha);

        if(!token) {
            return reply.status(401).send({ error: 'Usuário ou senha inválidos' });
        }
        return { token };
    });
    
    fastify.post('/accounts', async (request, reply) => {
        const { nome, email, senha } = request.body;

        await auth.create({
            nome, 
            email, 
            senha: await hashPassword(senha)
        })
        return reply.status(201).send();
    });

  
    fastify.put('/accounts/:id', async (request, reply) => {
        const { nome, email, senha } = request.body;

        await auth.update(request.params.id,{
            nome, 
            email, 
            senha
        })
        return reply.status(201).send();
    });
  
    fastify.delete('/accounts/:id', async (request, reply) => {
        await auth.delete(request.params.id);
    });

}