import { FavoriteController } from "../controllers/FavoriteController.js";
import verifySession from "../middlewares/verifySession.js";

export default async function favoriteRoutes(fastify, options){

    const fav = new FavoriteController();

    fastify.get('/favorite/:accountId', {preHandler: [verifySession]}, async (request, reply) => {
        const { accountId } = request.params;
        const favorites = await fav.list(accountId);
        reply.status(200).send({message: 'Sessão Ativa! Acesso Permitido!', favorites});
        return favorites;
    });
    
    fastify.get('/favorite/most', {preHandler: [verifySession]}, async (request, reply) => {
        const favorites = await fav.listMostFavorites();
        reply.status(200).send({message: 'Listagem Feita com Sucesso!', favorites});
        return favorites;
    });

    fastify.post('/favorite', {preHandler: [verifySession]}, async (request, reply) => {
        const { accountId } = request.body;
        const { bookId } = request.body;
        await fav.create(accountId, bookId);
        return reply.status(201).send({message: 'Favorito Adicionado!'});
    });

    fastify.delete('/favorite', {preHandler: [verifySession]}, async (request, reply) => {
        const { accountId } = request.body;
        const { bookId } = request.body;
        await fav.delete(accountId, bookId);
        return reply.status(200).send({message: 'Remoção Realizada!'});
    });
}