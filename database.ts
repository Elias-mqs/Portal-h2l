
import { createPool, Pool } from 'mysql';
import { Kysely, MysqlDialect } from 'kysely';

const pool = createPool({
        database: 'portal-h2l',
        host: 'localhost',
        user: 'admin',
        password:'testeteste',
        port: 3000,
        connectionLimit: 10,
})

const dialect = new MysqlDialect({
    pool,
})

export const db = new Kysely({
    dialect,
})