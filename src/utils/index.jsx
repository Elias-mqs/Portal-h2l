const crypto = require('crypto');
import { db } from './database'



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


        generateToken().then(({ token, createdAt }) => {
            console.log(`Token: ${token}`);
            console.log(`Created At: ${createdAt}`);


        }).catch(err => {
            console.error(err);
        });

        
        const TOKEN_EXPIRATION_TIME = 60 * 1000; // 1 minuto em milissegundos
        
        export function isTokenExpired(createdAt) {
            const currentTime = Date.now();
            const elapsedTime = currentTime - createdAt;
            return elapsedTime > TOKEN_EXPIRATION_TIME;
        }
        
         // Busque o token e createdAt do banco de dados
         const createdAt = Date.now();
        if (isTokenExpired(createdAt)) {
            console.log('Token expirou');
        } else {
            console.log('Token ainda é válido');
        }












// const crypto = require('crypto');
// import { db } from './database'

// export async function criandotoken(req, res) {

//     if (req.method === 'POST') {
//         console.log(1)

//         const { username } = req.body;
//         console.log(2)
//         const userid = await db.selectFrom('usuarios')
//             .select('usr_id')
//             .where('username', '=', username)
//             .executeTakeFirst()
//             console.log(3)

//         async function generateToken() {
//             return new Promise((resolve, reject) => {
//                 crypto.randomBytes(64, (err, buffer) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         const token = buffer.toString('hex');
//                         const createdAt = Date.now();
//                         resolve({ token, createdAt });
//                     }
//                 });
//             });
//         }
//         console.log(4)


//         generateToken().then(({ token, createdAt }) => {
//             console.log(`Token: ${token}`);
//             console.log(`Created At: ${createdAt}`);

//             db.updateTable('usuarios')
//                 .set({ token: token, createdAt: createdAt })
//                 .where('usr_id', '=', userid.usr_id)
//                 .execute();

//         }).catch(err => {
//             console.error(err);
//         });
//         console.log(5)

        
//         const TOKEN_EXPIRATION_TIME = 60 * 1000; // 1 minuto em milissegundos
        
//         function isTokenExpired(createdAt) {
//             const currentTime = Date.now();
//             const elapsedTime = currentTime - createdAt;
//             return elapsedTime > TOKEN_EXPIRATION_TIME;
//         }
//         console.log(6)
        
//         const { token, createdAt } = db.selectFrom('usuarios')
//             .select('token', 'createdAt') // Selecione token e createdAt
//             .where('usr_id', '=', userid.usr_id)
//             .executeTakeFirst();
//             console.log(7)
//         if (isTokenExpired(createdAt)) {
//             console.log('Token expirou');
//         } else {
//             console.log('Token ainda é válido');
//         }
//         console.log(8)
//     } else {
//         // Se o método HTTP não for POST, retorna um erro de método não permitido
//         res.status(405).json({ message: 'Método não permitido' });
//     };
//     console.log(9)
// }
