import { Book } from "../models/Book.js";

export class BookController {

    async list (){
        return await Book.list();
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

export default BookController;