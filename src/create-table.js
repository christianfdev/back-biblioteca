import 'dotenv/config';
import { sql } from "./db.js";

// sql`DROP TABLE IF EXISTS account`.then(() => {
//     console.log('Tabela apagada!')
// })

// sql`
// CREATE TABLE account(
//     id TEXT PRIMARY KEY,
//     nome VARCHAR(255) NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     senha TEXT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
//     deleted_at TIMESTAMP,
//     role VARCHAR(255) DEFAULT 'user'
// );
// `.then(() => {
//     console.log('Tabela Criada!');
// })


import { randomUUID } from "crypto";


sql`CALL create_superadmin_account(${randomUUID()}, ${process.env.SPALOGIN}, ${process.env.SPAEMAIL}, ${process.env.SPASENHA}, ${process.env.SPAROLE});`.then(() => {
    console.log('Super Admin Criado!');
})