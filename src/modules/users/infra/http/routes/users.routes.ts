import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersConrtroller';
import UserAvatarController from '../controllers/UserAvatarController';

// import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

const usersRouter = Router();

const upload = multer(uploadConfig);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

/* {

    const { name, email, password } = request.body;

    //SEM INJEÇÃO DE DEPENDENCIA
    //const usersRepository = new UsersRepository
    // const createUser = new CreateUserService(usersRepository);

    const createUser = container.resolve(CreateUserService) ;

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // Com a atualização do TypeScript, isso se faz necessário
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);

}); */

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
