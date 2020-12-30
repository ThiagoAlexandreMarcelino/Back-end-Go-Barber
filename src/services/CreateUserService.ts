import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersReporsitory = getRepository(User);

    const checkUserExists = await usersReporsitory.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email addrees already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersReporsitory.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersReporsitory.save(user);

    return user;
  }
}

export default CreateUserService;
