import { db } from '@/utils/database'
import { cript, decript } from '@/utils'


export default async function handler(req, res) {


  if (req.method === 'GET') {

    const dataCript = req.url.split('/api/searchUserTeste?params=')[1];

    if (!dataCript) {
      return res.status(400).json({ message: 'Invalid request data' });
    }


    ///////////// DESCRIPTOGRAFAR OS PARAMETROS /////////////
    let data;
    try {
      data = decript(dataCript);

      if (!data) {
        throw new Error('Decryption failed');
      }

    } catch (error) {
      console.error('Decryption error:', error);
      return res.status(400).json({ message: 'Invalid request data' });
    }



    ///////////// REQUISIÇÃO PARA O GESTOR (ADMIN 1) /////////////
    if (data.admin === '1') {

      try {

        const userList = await db
          .selectFrom('usuarios')
          .select(['nome as name', 'email', 'setor', 'username', 'usr_typeUser as typeUser', 'usr_id as info'])
          .where('usr_codcli', '=', `${data.codCli}`)
          .where('usr_loja', '=', `${data.loja}`)
          .where('admin', '=', '0')
          .execute()


        let dados;
        try {
          dados = cript(userList);
        } catch (error) {
          console.error('Encryption error:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }


        return res.status(200).json({ dtCli: dados.code });

      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    }



    ///////////// REQUISIÇÃO PARA O ADM BASICO (ADMIN 2) /////////////
    if (data.admin === '2') {

      if (!data.codCli && !data.nomeCli && !data.name) {
        res.status(400).json({ message: 'Bad Request!' });
        return;
      }

      try {

        let query = db
          .selectFrom('usuarios')
          .select(['nome as name', 'email', 'setor', 'username', 'usr_nomecli as nomeCli', 'usr_typeUser as typeUser', 'usr_id as info'])
          .where('admin', '!=', '3')

        if (data.name) {
          query = query.where('nome', 'like', `%${data.name}%`);
        }

        if (data.nomeCli) {
          query = query.where('usr_nomecli', 'like', `%${data.nomeCli}%`);
        }

        if (data.codCli) {
          query = query.where('usr_codcli', '=', data.codCli.padStart(6, '0'));
        }

        const userList = await query.execute();


        let dados;
        try {
          dados = cript(userList);
        } catch (error) {
          console.error('Encryption error:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }


        return res.status(200).json({ dtCli: dados.code });

      } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }



    ///////////// REQUISIÇÃO PARA O ADM GERAL (ADMIN 3) /////////////
    if (data.admin === '3') {

      if (!data.codCli && !data.nomeCli && !data.name) {
        res.status(400).json({ message: 'Bad Request!' });
        return;
      }

      try {

        let query = db
          .selectFrom('usuarios')
          .select(['nome as name', 'email', 'setor', 'username', 'usr_nomecli as nomeCli', 'usr_typeUser as typeUser', 'usr_id as info'])

        if (data.name) {
          query = query.where('nome', 'like', `%${data.name}%`);
        }

        if (data.nomeCli) {
          query = query.where('usr_nomecli', 'like', `%${data.nomeCli}%`);
        }

        if (data.codCli) {
          query = query.where('usr_codcli', '=', data.codCli.padStart(6, '0'));
        }

        const userList = await query.execute();


        let dados;
        try {
          dados = cript(userList);
        } catch (error) {
          console.error('Encryption error:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }


        return res.status(200).json({ dtCli: dados.code });

      } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    }



    ///////////// REQUISIÇÃO PARA O OPERADOR (ADMIN 4) /////////////
    if (data.admin === '4') {

      try {

        const userList = await db
          .selectFrom('usuarios')
          .select(['nome as name', 'email', 'setor', 'username', 'usr_nomecli as nomeCli', 'usr_typeUser as typeUser', 'usr_id as info'])
          .where('usr_codcli', '=', `${data.codCli}`)
          .where((eb) => eb.or([
            eb('admin', '=', '1'),
            eb('admin', '=', '0'),
          ]))
          .execute()


        let dados;
        try {
          dados = cript(userList);
        } catch (error) {
          console.error('Encryption error:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }


        return res.status(200).json({ dtCli: dados.code });

      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    }



  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
