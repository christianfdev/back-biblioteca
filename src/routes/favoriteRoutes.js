import { FavoriteController } from "../controllers/FavoriteController.js";
import verifySession from "../middlewares/verifySession.js";

export default async function favoriteRoutes(fastify, options){

    const fav = new FavoriteController();

    fastify.get('/favorite', {preHandler: [verifySession]}, async (request, reply) => {
        const favorites = await fav.list(request.user.id);
        reply.status(200).send({message: 'Sessão Ativa! Acesso Permitido!', favorites});
        return favorites;
    });
    
    fastify.get('/favorite/most', {preHandler: [verifySession]}, async (request, reply) => {
        const favorites = await fav.listMostFavorites();
        reply.status(200).send({message: 'Listagem Feita com Sucesso!', favorites});
        return favorites;
    });

    fastify.post('/favorite', {preHandler: [verifySession]}, async (request, reply) => {
        console.log("CHEGAMOS AQUI PRIMEIRO!!!")
        
        const { bookId } = request.body;

        console.log("CHEGAMOS AQUI!!!")
        await fav.create(request.user.id, bookId);
        console.log("CHEGAMOS AQUI 222222222222222")
        return reply.status(201).send({message: 'Favorito Adicionado!'});
    });

    fastify.delete('/favorite/:bookId', {preHandler: [verifySession]}, async (request, reply) => {
        const accountId = request.user.id;
        const { bookId } = request.params;
        await fav.delete(accountId, bookId);
        return reply.status(200).send({message: 'Remoção Realizada!'});
    });
}