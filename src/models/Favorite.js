import { sql } from '../db.js';

export class Favorite {
    id;
    accountId;
    bookId;

    constructor ({ id, accountId, bookId }){
        this.id = id;
        this.accountId = accountId;
        this.bookId = bookId;
    }

    static async create (accountId, bookId){

        return sql`INSERT INTO favorite_books (account_id, book_id) VALUES (${accountId}, ${bookId}) ON CONFLICT DO NOTHING`;
    }

    static async delete (accountId, bookId) {
        return sql`DELETE FROM favorite_books WHERE account_id = ${accountId} AND book_id = ${bookId}`;
    }


    static async listFavorites (search, accountId){
        if(search){
            const formattedSearch = `%${search}%`;
            return sql`SELECT b.* FROM book b JOIN favorite_books fb ON b.id = fb.book_id WHERE fb.account_id = ${accountId} AND (title ilike ${formattedSearch} or author ilike ${formattedSearch} or category ilike ${formattedSearch})`;
        }else{
            return sql`SELECT b.* FROM book b JOIN favorite_books fb ON b.id = fb.book_id WHERE fb.account_id = ${accountId}`;
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