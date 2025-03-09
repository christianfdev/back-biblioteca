import { sql } from '../db.js';

export class Book {

    id;
    title;
    author;
    category;
    description;
    published_on;

    constructor({ id, title, author, category, description, published_on }) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.description = description;
        this.published_on = published_on;
    }

    static async list (search){
        if(search){
            const formattedSearch = `%${search}%`;
            return sql`select * from book where title ilike ${formattedSearch} or author ilike ${formattedSearch} or category ilike ${formattedSearch}`;
        }else{
            return sql`select * from book`;
        }
    }

    static async create(book){
        const { title, author, category, description, published_on } = book;
        
        return sql`insert into book (title, author, category, description, published_on) VALUES (${title}, ${author}, ${category}, ${description}, ${published_on})`;
    }

    static async update(bookId, bookUpdated){
        const { title, author, category, description, published_on } = bookUpdated;

        return sql`update book set title = ${title}, author = ${author}, category = ${category}, description = ${description}, published_on = ${published_on} where id = ${bookId}`
    }

    static async delete(bookId){
        return sql`delete from book where id = ${bookId}`
    }
}

