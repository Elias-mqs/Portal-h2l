// pages/api/send-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {

        let transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.USERMAIL,
                pass: process.env.PASSMAIL
            }
        });

        let message = {
            from: `'testando' <${process.env.USERMAIL}>`,
            to: "eliasdev397@gmail.com",
            replayTo: req.body.email,
            subject: "Message title",
            text: "Mensagem em texto",
            html: "<p>Mensagem em HTML</p>",
        };

        transport.sendMail(message, function (err) {
            if (err) return res.status(400).json({
                erro: true,
                message: 'Erro: E-mail não enviado com sucesso!'
            })

            return res.status(200).json({ erro: false, message: "E-mail enviado com sucesso!" });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
