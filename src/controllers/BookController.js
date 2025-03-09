import { Book } from "../models/Book.js";

export class BookController {

    async list (search){
        return await Book.list(search);
    }

    async create(book){
        return await Book.create(book);
    }

    async update(bookId, bookUpdated){
        return await Book.update(bookId, bookUpdated);
    }

    async delete(bookId){
        return await Book.delete(bookId);
    }
}
