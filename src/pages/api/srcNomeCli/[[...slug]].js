import { cript, decript } from '@/utils'


export default async function handler(req, res) {
  
  const getUrl = process.env.URLAPI;

  if (req.method === 'GET') {

    const dataCript = req.url.split('/api/srcNomeCli/')[1];
    
    if (!dataCript) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

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

    try {

      const response = await fetch(`${getUrl}${data}`);

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const info = await response.json();

      let dados;

      try {
        dados = cript(info);
      } catch (error) {
        console.error('Encryption error:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      return res.status(200).json({ dtCli: dados.code });

     } catch (error) {
      console.error('Fetch error:', error);
      return res.status(500).json({ message: 'Failed to fetch data from external API' });
    }

  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
