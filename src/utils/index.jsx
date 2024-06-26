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

///////// GERAR SENHAS ALEATÓRIA CONFORME REQUISITOS /////////
function generateRandomPass() {
    const length = 10;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
  
    // Garantir que pelo menos um de cada tipo de caractere está presente
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()";
  
    // Adicionar um de cada tipo de caractere
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];
  
    // Completar a senha com caracteres aleatórios até atingir o comprimento desejado
    for (let i = password.length; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
  
    // Embaralhar os caracteres para evitar padrões previsíveis
    return password.split('').sort(() => 0.5 - Math.random()).join('');
  }



export { authenticate, hashPassword, removeToken, decript, cript, generateRandomPass };

