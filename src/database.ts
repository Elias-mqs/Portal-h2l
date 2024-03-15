
import { createPool, Pool } from 'mysql';
import { Kysely, MysqlDialect } from 'kysely';

const pool = createPool({
    // Configurando o banco de dados
        database: 'portal-h2l',
        host: 'localhost',

        // user e a senha são os mesmos da config do mysql no xampp
        user: 'root',
        password:'',
        port: 3306,

        // maximo de conexões permitidas...
        // verificar com erick como funciona**
        connectionLimit: 10,
})

// verificar para que serve**
const dialect = new MysqlDialect({
    pool,
})

export const db = new Kysely({
    dialect,
}) 