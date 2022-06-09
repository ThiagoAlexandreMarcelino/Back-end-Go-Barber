import { Request, Response } from 'express';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { instanceToPlain } from 'class-transformer';

import { container } from 'tsyringe';

export default class UserProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ user_id });

    return response.json({ user: instanceToPlain(user) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { email, name, password, old_password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);
    const user = await updateProfile.execute({
      user_id,
      email,
      name,
      password,
      old_password,
    });

    // devido ao dar erro no operador 'delete' do js, deletei o password desta forma
    // delete user.password

    return response.json({ user: instanceToPlain(user) });
  }
}
