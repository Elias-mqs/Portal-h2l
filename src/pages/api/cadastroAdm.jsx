import { db } from '@/utils/database';
import nodemailer from 'nodemailer';
import { hashPassword, generateRandomPass, decript } from '@/utils'



const transport = nodemailer.createTransport({
    host: "smtp.h2l.com.br",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USERMAIL,
        pass: process.env.PASSMAIL
    }
});


export default async function handler(req, res) {

    if (req.method === 'POST') {


        const dataDecypt = decript(req.body.code)
        const { name, username, email, setor, codCli, loja, nomeCli } = dataDecypt;


        if (!codCli || !loja) {
            return res.status(404).json({ message: 'Nome da empresa inválido' })
        }
        if (!name || !username || !email || !setor || !nomeCli) {
            return res.status(404).json({ message: 'Necessario informar todos os dados' })
        }


        try {

            const dados = await db.selectFrom('usuarios')
                .select(['nome', 'username', 'email'])
                .where((eb) => eb.or([
                    eb('nome', '=', name),
                    eb('username', '=', username),
                    eb('email', '=', email)
                ]))
                .executeTakeFirst();


            if (dados) {
                if (dados.nome === name) {
                    return res.status(409).json({ message: 'Já existe um usuário com esse nome' });
                } else if (dados.username === username) {
                    return res.status(409).json({ message: 'Nome de usuário já cadastrado' });
                } else if (dados.email === email) {
                    return res.status(409).json({ message: 'E-mail já cadastrado' });
                }
            }


            //////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////// INICIO DO ENVIO DO EMAIL COM SENHA E INSTRUÇÕES PARA O USUÁRIO /////////////////
            //////////////////////////////////////////////////////////////////////////////////////////////////

            const newPassword = generateRandomPass()

            // CONFIGURAÇÃO DA MENSAGEM COM SENHA E INSTRUÇÕES PARA O USUÁRIO
            const message = {
                from: `Portal H2L <${process.env.USERMAIL}>`,
                to: email,
                replyTo: email,
                subject: "Bem-vindo ao Portal H2L!",
                text: `
                Olá ${name},
                
                Você foi cadastrado no nosso portal e uma senha temporária foi gerada para que você possa acessar o sistema. Por favor, siga as instruções abaixo para realizar seu primeiro acesso e trocar sua senha.
                
                Dados de Acesso:
                Usuário: (será enviado pelo gestor)
                Senha Temporária: ${newPassword}
                
                Instruções de Acesso:
                1. Acesso ao Portal:
                    - O link para acesso ao portal será fornecido pelo gestor que realizou seu cadastro.
                
                2. Troca da Senha:
                    - Para confirmar seu e-mail e garantir a segurança da sua conta, é necessário trocar a senha temporária. Siga os passos abaixo:
                        1. Faça login no portal usando a senha temporária.
                        2. Clique no ícone de engrenagem (configurações) no canto superior direito.
                        3. Selecione "Informações da Conta".
                        4. Clique em "Atualizar Senha" e siga as instruções para definir sua nova senha.
                
                Se você não solicitou este cadastro, por favor, ignore este e-mail.
                
                Atenciosamente,
                    Equipe H2L
                `,

                html: `
                <p>Olá ${name},</p>
                
                <p>Você foi cadastrado no nosso portal e uma senha temporária foi gerada para que você possa acessar o sistema. Por favor, siga as instruções abaixo para realizar seu primeiro acesso e trocar sua senha.</p>
                
                <h3>Dados de Acesso:</h3>
                <ul>
                    <li><strong>Usuário: (será enviado pelo gestor)</strong></li>
                    <li><strong>Senha Temporária:</strong> ${newPassword}</li>
                </ul>
                
                <h3>Instruções de Acesso:</h3>
                <ol>
                    <li><strong>Acesso ao Portal:</strong>
                    <ul>
                        <li>O link para acesso ao portal será fornecido pelo gestor que realizou seu cadastro.</li>
                    </ul>
                    </li>
                    <li><strong>Troca da Senha:</strong>
                        <ul>
                            <li>Para confirmar seu e-mail e garantir a segurança da sua conta, é necessário trocar a senha temporária. Siga os passos abaixo:</li>
                            <li>1. Faça login no portal usando a senha temporária.</li>
                            <li>2. Clique no ícone de engrenagem (configurações) no canto superior direito.</li>
                            <li>3. Selecione "Informações da Conta".</li>
                            <li>4. Clique em "Atualizar Senha" e siga as instruções para definir sua nova senha.</li>
                        </ul>
                    </li>
                </ol>
                
                <p>Se você não solicitou este cadastro, por favor, ignore este e-mail.</p>
                
                <p>Atenciosamente,<br>
                    Equipe H2L</p>
                `
            };

            // ENVIANDO EMAIL COM SENHA E INSTRUÇÕES
            await transport.sendMail(message);

            //////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////// FIM DO ENVIO DO EMAIL COM SENHA E INSTRUÇÕES PARA O USUÁRIO ////////////////////
            //////////////////////////////////////////////////////////////////////////////////////////////////




            const passwordHash = hashPassword(newPassword);

            db.insertInto('usuarios')
                .values({
                    nome: name,
                    username: username,
                    email: email,
                    setor: setor,
                    password_hash: passwordHash,
                    admin: '2',
                    usr_nomecli: nomeCli,
                    usr_codcli: codCli,
                    usr_loja: loja,
                    usr_typeUser: '5',
                })
                .execute();

            return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });

        } catch (error) {
            console.log(error)

            //Erro de autenticação
            res.status(400).json({ message: 'Verifique as informações ou contate o suporte' })

            return
        }

    } else {
        // Erro no protocolo: Não foi utilizado o método POST.
        res.status(405).json({ message: 'Contate o suporte' });
    }
}
