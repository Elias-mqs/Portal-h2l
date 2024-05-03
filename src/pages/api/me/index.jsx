
//src/pages/api/me/index.js
import jwt from 'jsonwebtoken';

export default async function me(req, res) {

  const secret = process.env.JWT_SECRET;
  const token = req.headers.authorization;

  try {
    const authToken = jwt.verify(token, secret);
    res.status(200).json({ authenticated: true })
  } catch (error) {
    res.status(401).json({ authenticated: false })
  }
}
