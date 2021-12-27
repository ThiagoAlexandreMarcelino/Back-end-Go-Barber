import { Router } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();


sessionsRouter.post('/', async (request, response) => {

    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    // Com a atualização do TypeScript, isso se faz necessário
    // const userWithoutPassword = {
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   created_at: user.created_at,
    //   updated_at: user.updated_at,
    // };

    return response.json({ user, token });


});

export default sessionsRouter;
