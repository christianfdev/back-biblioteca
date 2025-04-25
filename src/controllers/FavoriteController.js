import { Favorite } from "../models/Favorite.js";

export class FavoriteController {

    async list (search, accountId){
        return await Favorite.listFavorites(search, accountId);
    }

    async create (accountId, bookId) {
        return await Favorite.create(accountId, bookId);
    }
    
    async listMostFavorites () {
        return await Favorite.listMostFavorites();
    }

    async delete (accountId, bookId){
        return await Favorite.delete(accountId, bookId);
    }
}