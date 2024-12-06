export default async function checkSuperAdmin (request, reply) {


    const user = request.user;
  
    if (!user) {
      reply.code(401).send({ message: 'Usuário não autenticado' });
      return; 
    }

    if (user.role !== 'superadmin') {
      reply.code(403).send({ message: 'Acesso negado! Você não tem permissão para acessar esta rota.' });
      return;
    }

  };
  
