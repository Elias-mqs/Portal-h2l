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

async function authenticate(token) {
    const now = dayjs().unix()
    return await db
        .selectFrom('usuarios')
        .select(['usr_id', 'nome', 'username'])
        .where('token', token)
        .where('prazo', '>', now)
        .executeTakeFirst()
}

export { authenticate }

// Busque o token e createdAt do banco de dados
//  const createdAt = Date.now();
// if (isTokenExpired(createdAt)) {
//     console.log('Token expirou');
// } else {
//     console.log('Token ainda é válido');
// }










//////////////////////////////////////////////////////////////////////
////////////////// ANTIGO FUNCIONANDO //////////////////////////////////////////////////
//////////////////////////////////////////////////////////
// Gerar token para o login com sucesso
// const token = jwt.sign({ username: usuario.username, id: usuario.usr_id }, 'chave segura', { expiresIn: '1h' })

// // Salvar o token no banco de dados
// await db.updateTable('usuarios')
//     .set({ token: token })
//     .where('usr_id', '=', userid.usr_id)
//     .execute();
/////////////////////////////////////////////////////////////////////////////////