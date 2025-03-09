import { BookController } from "../controllers/BookController.js";
import checkSuperAdmin from "../middlewares/checkSuperAdmin.js";
import verifySession from "../middlewares/verifySession.js";

export default async function bookRoutes(fastify, options) {

    const book = new BookController();

    fastify.get('/books', { preHandler: [verifySession] }, async (request, reply) => {
        const search = request.query.search;
        const books = await book.list(search);
        reply.status(200).send({ message: 'Sessão ativa! Acesso permitido', books });
        return books;   
    });

    fastify.post('/books', { 
        preHandler: [verifySession, checkSuperAdmin],
        schema: {
            body: {
                type: 'object',
                required: ['title', 'author', 'category', 'description', 'published_on'],
                properties: {
                    title: { type: 'string' },
                    author: { type: 'string' },
                    category: { type: 'string' },
                    description: { type: 'string' },
                    published_on: { type: 'string' }
                }
            }
        }
    }, async (request, reply) => {
        const { title, author, category, description, published_on } = request.body;

        await book.create({ 
            title, 
            author, 
            category, 
            description, 
            published_on 
        });
        
        return reply.status(201).send();
    });

    fastify.put('/books/:id', { preHandler: [verifySession, checkSuperAdmin] }, async (request, reply) => {
        const { title, author, category, description, published_on } = request.body;

        await book.update(request.params.id, { 
            title, 
            author, 
            category, 
            description, 
            published_on 
        });

        return reply.status(201).send();
    });

    fastify.delete('/books/:id', { preHandler : [verifySession, checkSuperAdmin] }, async (request, reply) => {
        
        await book.delete(request.params.id);

        return reply.status(204).send();
    });
}
