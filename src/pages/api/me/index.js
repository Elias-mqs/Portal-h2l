
export default async function me(req, res) {
    
    const token = req.headers.get('authorization')
    const usuario = await authenticate(token)
  
    if (!usuario) {
      res.status(401).json({ message: 'Usuário não autenticado' })
    }
    res.status(200).json(usuario)
  }
  
    async function authenticate(token) {
        const now = dayjs().unix()
        return await db
            .selectFrom('usuarios')
            .select(['usr_id', 'nome'])
            .where('token', token)
            .where('prazo', '>', now)
            .executeTakeFirst()
  }
  
  
  ////////////////// FUNÇÃO DE AUTENTICAÇÃO DO TOKEN //////////////////
  
  
  
  
  
  
  /////////// Vou usar essa parte quando criar o usuario chefe///////////
  // Check if the user has the 'admin' role
  // if (session.user.role !== 'admin') {
  //   res.status(401).json({
  //     error: 'Acesso não autorizado. Restrito à administradores.',
  //   })
  //   return
  // }
  
  // Proceed with the route for authorized users
  // ... implementation of the API Route
  