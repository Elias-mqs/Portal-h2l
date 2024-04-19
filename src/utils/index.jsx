
// src/utils/index.js
const crypto = require('crypto');
import { db } from './database';
import dayjs from 'dayjs';


///////// GERAR TOKEN E DATA /////////
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


///////// AUTENTICAR TOKEN /////////
async function authenticate(token) {
    token = token.replace('Bearer ', '')
    const now = dayjs().unix()
    const user = await db
        .selectFrom('usuarios')
        .select(['usr_id', 'nome', 'username', 'createdAt'])
        .where('token', '=', token)
        .where('prazo', '>', now)
        .executeTakeFirst()

    if (user && validateToken(user.createdAt)) {
        return user;
    } else {
        throw new Error('Token inválido ou expirado');
    }
}

///////// VALIDADE TOKEN /////////

export function validateToken(createdAt) {
    const TOKEN_EXPIRATION_TIME = 60 * 60; // 1 hora em segundos
    const currentTime = dayjs().unix();
    const elapsedTime = currentTime - createdAt;
    return elapsedTime > TOKEN_EXPIRATION_TIME;
}


export { authenticate }
