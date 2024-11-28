import { AuthController } from "../controllers/AuthController.js";

export default async function authRoutes(fastify, options){

    const auth = new AuthController();
 

    fastify.get('/accounts', async (request) => {

        const accounts = await auth.list();
    
        return accounts;

    });

    fastify.post('/login', async (request, reply) => {
        

    });
    
    fastify.post('/accounts', async (request, reply) => {
        const { nome, email, senha } = request.body;

        await auth.create({
            nome, 
            email, 
            senha
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