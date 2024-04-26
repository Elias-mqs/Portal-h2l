// src/utils/index.js
import jwt from 'jsonwebtoken';
import { db } from './database';
import dayjs from 'dayjs';

const secret = process.env.JWT_SECRET;

///////// GERAR TOKEN E DATA /////////
export function generateToken(payload, secret) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn: '60s' }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                const createdAt = dayjs().unix();
                resolve({ token, createdAt });
            }
        });
    });
}

///////// AUTENTICAR TOKEN /////////
async function authenticate(token) {
    token = token.replace('Bearer ', '')
    try {
        const decoded = jwt.verify(token, secret);
        const user = await db
            .selectFrom('usuarios')
            .select(['usr_id', 'nome', 'username','email', 'createdAt'])
            .where('token', '=', token)
            .executeTakeFirst()

        if (user) {
            return user;
        } else {
            throw new Error('Token inválido ou expirado');
        }
    } catch (err) {
        throw new Error('Token inválido ou expirado');
    }
}

export { authenticate }
