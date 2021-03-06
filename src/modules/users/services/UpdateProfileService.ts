import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    email,
    name,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }
    const userWithupdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithupdatedEmail && userWithupdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use');
    }
    user.name = name;
    user.email = email;

    if (!old_password) {
      throw new AppError('You need to inform the old password');
    }

    if (!password) {
      throw new AppError('You need to inform the new password');
    }

    const comparePassword = await this.hashProvider.compareHash(
      old_password,
      user.password,
    );

    if (!comparePassword) {
      throw new AppError('Old password wrong');
    }

    user.password = await this.hashProvider.generateHash(password);

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
