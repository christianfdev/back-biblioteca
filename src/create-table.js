import 'dotenv/config';
import { sql } from "./db.js";


// Para dropar a tabela Account


// sql`DROP TABLE IF EXISTS account`.then(() => {
//     console.log('Tabela apagada!')
// })


// Para dropar a tabela Sessions 


// sql`DROP TABLE IF EXISTS sessions`.then(() => {
//     console.log('Tabela apagada!')
// })


// Criando a tabela Account

// sql`
// CREATE TABLE account(
//     id TEXT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password TEXT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
//     deleted_at TIMESTAMP,
//     role VARCHAR(255) DEFAULT 'user'
// );
// `.then(() => {
//     console.log('Tabela Criada!');
// })

// Criando a tabela Sessions

// sql`
// CREATE TABLE sessions (
//     id SERIAL PRIMARY KEY,           
//     account_id TEXT NOT NULL,         
//     token TEXT NOT NULL,            
//     expires_at TIMESTAMP NOT NULL,  
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, 
//     CONSTRAINT fk_account FOREIGN KEY (account_id) REFERENCES account (id) ON DELETE CASCADE
// );
// `.then(() => {
//     console.log('Tabela Criada!');
// })

// sql`
// CREATE TABLE book (
//     id SERIAL PRIMARY KEY,                 
//     title VARCHAR(255) NOT NULL,           
//     author VARCHAR(255) NOT NULL,          
//     category VARCHAR(100),                 
//     description TEXT,                     
//     published_on DATE,                     
//     created_at TIMESTAMP DEFAULT NOW(),    
//     updated_at TIMESTAMP DEFAULT NOW()     
// );
// `.then(() => {
//     console.log('Tabela Criada!');
// })



// Criando um Superadmin

// import { randomUUID } from "crypto";


// sql`CALL create_superadmin_account(${randomUUID()}, ${process.env.SPALOGIN}, ${process.env.SPAEMAIL}, ${process.env.SPASENHA}, ${process.env.SPAROLE});`.then(() => {
//     console.log('Super Admin Criado!');
// })

// Criando a Tabela para Adição de Livros Favoritos

sql`
CREATE TABLE favorite_books (
    id SERIAL PRIMARY KEY,
    account_id TEXT NOT NULL, 
    book_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_account FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE,
    CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE CASCADE,
    UNIQUE (account_id, book_id)
);`.then(() => {
        console.log('Tabela Criada!');
});