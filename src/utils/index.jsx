// src/utils/index.js
import jwt from 'jsonwebtoken';
import { db } from './database';
import crypto from 'crypto'
import Cookies from 'js-cookie'
import * as CryptoJS from "crypto-js";


const secret = process.env.JWT_SECRET;

///////// GERAR TOKEN /////////
export function generateToken(payload, secret) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn: '59m' }, (err, ssn) => {
            if (err) {
                reject(err);
            } else {
                resolve({ ssn });
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
            .select(['usr_id', 'username', 'email', 'admin', 'setor', 'nome', 'usr_nomecli', 'usr_codcli', 'usr_loja'])
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

///////// REMOVE TOKEN /////////
function removeToken(token) {
    return Cookies.remove(token)
}

///////// DESCRIPTOGRAFAR REQUISIÇÕES /////////
function decript(dados) {
    const passCryp = process.env.NEXT_PUBLIC_PASSCRYP
    let bytes = CryptoJS.AES.decrypt(dados, passCryp);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decryptedData
}

///////// CRIPTOGRAFAR REQUISIÇÕES /////////
function cript(dados) {
    const passCryp = process.env.NEXT_PUBLIC_PASSCRYP
    const encryptedForm = CryptoJS.AES?.encrypt(JSON.stringify(dados), passCryp).toString()
    const data = { code: encryptedForm }
    return data
}




export { authenticate, hashPassword, removeToken, decript, cript };


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
