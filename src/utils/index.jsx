
// src/utils/index.js
const crypto = require('crypto');
import { db } from './database';
import dayjs from 'dayjs';



export function generateToken() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buffer) => {
            if (err) {
                reject(err);
            } else {
                const token = buffer.toString('hex');
                const createdAt = Date.now();
                resolve({ token, createdAt });
            }
        });
    });
}



const TOKEN_EXPIRATION_TIME = 60 * 1000; // 1 minuto em milissegundos

export function validateToken(createdAt) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - createdAt;
    return elapsedTime > TOKEN_EXPIRATION_TIME;
}

// src/utils/index.js
async function authenticate(token) {
    token = token.replace('Bearer ', '')
    const now = dayjs().unix()
    return await db
        .selectFrom('usuarios')
        .select(['usr_id', 'nome', 'username'])
        .where('token', '=', token)
        .where('prazo', '>', now)
        .executeTakeFirst()
}

export { authenticate }
