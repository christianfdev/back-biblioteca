import { Favorite } from "../models/Favorite.js";

export class FavoriteController {

    async list (search, userId){
        return await Favorite.listFavorites(search, userId);
    }

    async create (userId, bookId) {
        return await Favorite.create(userId, bookId);
    }
    
    async listMostFavorites () {
        return await Favorite.listMostFavorites();
    }

    async delete (userId, bookId){
        return await Favorite.delete(userId, bookId);
    }
}