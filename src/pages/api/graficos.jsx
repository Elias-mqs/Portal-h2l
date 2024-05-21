// pages/api/plotly.js

export default async function handler(req, res) {
  try {
    const response = await fetch('https://cdn.plot.ly/plotly-2.32.0.min.js');
    const scriptContent = await response.text();

    console.log(scriptContent)

    res.setHeader('Content-Type', 'application/javascript');
    res.status(200).send(scriptContent);
  } catch (error) {
    console.error('Erro ao carregar o script:', error);
    res.status(500).end();
  }
}
