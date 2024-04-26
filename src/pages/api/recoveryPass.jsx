// pages/api/recoveryPass.jsx
import nodemailer from 'nodemailer';
import { db } from '../../utils/database';
import jwt from 'jsonwebtoken';

let transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.USERMAIL,
        pass: process.env.PASSMAIL
    }
});

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const secret = process.env.JWT_SECRET;
        
        const { email, password } = req.body;



        if (!email) {
            return res.status(401).json({ message: 'Necessário informar um e-mail' })
        }
        if (!password) {
            return res.status(401).json({ message: 'Necessário informar uma senha' })
        }

        if (email) {

            const result = await db
                .selectFrom('usuarios')
                .select(['email', 'usr_id'])
                .where('email', '=', email)
                .execute()

            const payload = {
                email: result.email,
                id: result.usr_id
            };
            const options = {
                expiresIn: '10m'
            }
            const temporaryToken = jwt.sign(payload, secret, options);



            let resetPasswordUrl = `http://localhost:3000/recoveryPass?token=${temporaryToken}`;

            let message = {
                from: `'Portal H2L' <${process.env.USERMAIL}>`,
                to: email,
                replyTo: email,
                subject: "Recuperação de senha",
                text: `Olá, \n\nVocê solicitou a recuperação de senha. Por favor, clique no link a seguir para redefinir sua senha: \n\n${resetPasswordUrl} \n\nSe você não solicitou a recuperação de senha, por favor, ignore este e-mail.\n\nAtenciosamente,\nPortal H2L`,
                html: `<p>Olá,</p><p>Você solicitou a recuperação de senha. Por favor, clique no link a seguir para redefinir sua senha:</p><p><a href="${resetPasswordUrl}">${resetPasswordUrl}</a></p><p>Se você não solicitou a recuperação de senha, por favor, ignore este e-mail.</p><p>Atenciosamente,<br>Portal H2L</p>`,
            };


            try {

                if (!result || result.length === 0) {
                    return res.status(404).json({ message: 'Email não encontrado' })
                }

                await transport.sendMail(message);

                return res.status(200).json({ message: 'E-mail enviado com sucesso!' });

            } catch (error) {
                console.log(error)
                return res.status(400).json({ message: 'Erro ao enviar o email!' });
            }
        }

        if(password){

        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
