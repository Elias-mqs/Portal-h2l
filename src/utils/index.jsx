// src/utils/index.js
import jwt from 'jsonwebtoken';
import { db } from './database';
import dayjs from 'dayjs';
import crypto from 'crypto'


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
            .select(['usr_id', 'nome', 'username','email'])
            .where('usr_id', '=', decoded.id)
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

///////// HASHEAR SENHAS /////////
function hashPassword(password) {
    try {
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        return hashedPassword;
    } catch (error) {
        throw new Error('Erro ao gerar o hash da senha');
    }
}


export { authenticate, hashPassword };


//    ANALISAR ESSA FORMA DE CRIAR SENHAS, TEM QUE VER COMO É O CAMPO NO BANCO DE DADOS REAL 

// function hashPassword(password) {
//     try {
//         // Gera um salt aleatório
//         const salt = crypto.randomBytes(16).toString('hex');

//         // Gera um hash da senha usando o salt
//         const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');

//         // Retorna o salt e o hash da senha
//         return { salt, hashedPassword };
//     } catch (error) {
//         throw new Error('Erro ao gerar o hash da senha');
//     }
// }

// function verifyPassword(password, hashedPassword, salt) {
//     const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
//     return hashedPassword === hash;
// }

// Exemplo de uso
// const password = 'senhaSegura123';
// const { salt, hashedPassword } = hashPassword(password);

// console.log(`Salt: ${salt}`);
// console.log(`Hashed Password: ${hashedPassword}`);

// const isPasswordCorrect = verifyPassword(password, hashedPassword, salt);

// console.log(`A senha está correta? ${isPasswordCorrect ? 'Sim' : 'Não'}`);
