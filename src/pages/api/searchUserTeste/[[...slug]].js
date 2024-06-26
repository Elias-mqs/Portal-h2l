import { db } from '@/utils/database'
import { cript, decript } from '@/utils'


export default async function handler(req, res) {


  if (req.method === 'GET') {

    const dataCript = req.url.split('/api/searchUserTeste?params=')[1];

    if (!dataCript) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    let data;

    try {
      data = decript(dataCript);

      console.log(data)

      if (!data) {
        throw new Error('Decryption failed');
      }
    } catch (error) {
      console.error('Decryption error:', error);
      return res.status(400).json({ message: 'Invalid request data' });
    }



    if (data.admin === 4) {
      try {
        console.log("Iniciando consulta no banco de dados...");

        const userList = await db
          .selectFrom('usuarios')
          .select(['nome as name', 'email', 'setor', 'username', 'usr_id as info'])
          .where('usr_codcli', '=', `${data.codCli}`)
          .where((eb) => eb.or([
            eb('admin', '=', '1'),
            eb('admin', '=', '0'),
          ]))
          .execute()

        console.log("Consulta finalizada, resultado: ", userList);

        return res.status(200).json({ message: 'tudo certo' })

      } catch (error) {
        console.error(error)
      }
    }




    // let dados

    // try {
    //   dados = cript(userList);
    // } catch (error) {
    //   console.error('Encryption error:', error);
    //   return res.status(500).json({ message: 'Internal server error' });
    // }

    // return res.status(200).json({ dtCli: dados.code });



  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
