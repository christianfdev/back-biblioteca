import { sql } from '../db.js';

export class Book {

    id;
    title;
    author;
    category;
    description;
    published_on;
    cover_image;

    constructor({ id, title, author, category, description, published_on, cover_image }) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.description = description;
        this.published_on = published_on;
        this.cover_image = cover_image
    }

    static async list (search){
        if(search){
            const formattedSearch = `%${search}%`;
            return sql`select * from book where title ilike ${formattedSearch} or author ilike ${formattedSearch} or category ilike ${formattedSearch}`;
        }else{
            return sql`select * from book`;
        }
    }

    static async findOne(bookId){
        const book = await sql`select * from book where id = ${bookId}`;
        return book[0];
    }

    static async create(book){
        const { title, author, category, description, published_on, cover_image} = book;
        
        return sql`insert into book (title, author, category, description, published_on, cover_image) VALUES (${title}, ${author}, ${category}, ${description}, ${published_on}, ${cover_image})`;
    }

    static async update(bookId, bookUpdated){
        const { title, author, category, description, published_on, cover_image} = bookUpdated;

        return sql`update book set title = ${title}, author = ${author}, category = ${category}, description = ${description}, published_on = ${published_on}, cover_image = ${cover_image} where id = ${bookId}`
    }

    static async delete(bookId){
        return sql`delete from book where id = ${bookId}`
    }
}

