// pages/api/send-email.js
import nodemailer from 'nodemailer';
import { db } from '../../utils/database';

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

        const email = req.body.email;

        if (!email) {
            return res.status(401).json({ message: 'Necessário informar um e-mail' })
        }

        const result = await db
            .selectFrom('usuarios')
            .select('email')
            .where('email', '=', email)
            .execute()


        let message = {
            from: `'testando' <${process.env.USERMAIL}>`,
            to: email,
            replyTo: email,
            subject: "Message title",
            text: "Mensagem em texto",
            html: "<p>Mensagem em HTML</p>",
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

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
