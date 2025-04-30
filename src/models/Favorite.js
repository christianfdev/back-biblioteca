import { sql } from '../db.js';

export class Favorite {
    id;
    userId;
    bookId;

    constructor ({ id, userId, bookId }){
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
    }

    static async create (userId, bookId){

        return sql`INSERT INTO favorite_books (user_account_id, book_id) VALUES (${userId}, ${bookId}) ON CONFLICT DO NOTHING`;
    }

    static async delete (userId, bookId) {
        return sql`DELETE FROM favorite_books WHERE user_account_id = ${userId} AND book_id = ${bookId}`;
    }


    static async listFavorites (search, userId){
        if(search){
            const formattedSearch = `%${search}%`;
            return sql`SELECT b.* FROM book b JOIN favorite_books fb ON b.id = fb.book_id WHERE fb.user_account_id = ${userId} AND (title ilike ${formattedSearch} or author ilike ${formattedSearch} or category ilike ${formattedSearch})`;
        }else{
            return sql`SELECT b.* FROM book b JOIN favorite_books fb ON b.id = fb.book_id WHERE fb.user_account_id = ${userId}`;
        }
    }

    static async listMostFavorites () {
        return sql`SELECT b.*, COALESCE(COUNT(fb.book_id), 0) AS favorites_count 
            FROM book b
            LEFT JOIN favorite_books fb ON b.id = fb.book_id
            GROUP BY b.id
            ORDER BY favorites_count DESC
            LIMIT 3;`;
    }
}