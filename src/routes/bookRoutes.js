import { BookController } from "../controllers/BookController.js";
import checkSuperAdmin from "../middlewares/checkSuperAdmin.js";
import verifySession from "../middlewares/verifySession.js";

export default async function bookRoutes(fastify, options) {

    const bookController = new BookController();

    fastify.get('/books', { preHandler: [verifySession] }, async (request, reply) => {
        const search = request.query.search;
        const books = await bookController.list(search);
        reply.status(200).send({ message: 'Sessão ativa! Acesso permitido', books });
        return books;   
    });

    fastify.get('/books/:id', { preHandler: [verifySession] }, async (request, reply) => {
        const bookId = request.params.id;
        const book = await bookController.findOne(bookId);
        reply.status(200).send({ message: 'Sessão ativa! Acesso permitido', book });
        return book;   
    });

    fastify.post('/books', { 
        preHandler: [verifySession, checkSuperAdmin],
        schema: {
            body: {
                type: 'object',
                required: ['title', 'author', 'category', 'description', 'published_on', 'cover_image'],
                properties: {
                    title: { type: 'string' },
                    author: { type: 'string' },
                    category: { type: 'string' },
                    description: { type: 'string' },
                    published_on: { type: 'string' },
                    cover_image: {type: 'string'}
                }
            }
        }
    }, async (request, reply) => {
        const { title, author, category, description, published_on, cover_image } = request.body;

        await bookController.create({ 
            title, 
            author, 
            category, 
            description, 
            published_on,
            cover_image
        });
        
        return reply.status(201).send();
    });

    fastify.put('/books/:id', { preHandler: [verifySession, checkSuperAdmin] }, async (request, reply) => {
        const { title, author, category, description, published_on, cover_image } = request.body;

        await bookController.update(request.params.id, { 
            title, 
            author, 
            category, 
            description, 
            published_on, 
            cover_image
        });

        return reply.status(201).send();
    });

    fastify.delete('/books/:id', { preHandler : [verifySession, checkSuperAdmin] }, async (request, reply) => {
        await bookController.delete(request.params.id);

        return reply.status(204).send();
    });
}
