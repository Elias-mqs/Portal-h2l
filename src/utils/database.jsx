
import { createPool } from 'mysql';
import { Kysely, MysqlDialect } from 'kysely';

const pool = createPool({
    // Configurando o banco de dados
        database: 'portal-h2l',
        host: 'localhost',
        user: 'root',
        password:'',
        port: 3306,
        connectionLimit: 10,
})


const dialect = new MysqlDialect({
    pool,
})

export const db = new Kysely({
    dialect,
}) 