import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRespository = getRepository(User);

    const user = await userRespository.findOne(user_id);

    if (!user) {
      throw new Error('Only authenticated users can change avatar');
    }
    if (user.avatar) {
      const userAvatarFilePah = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePah);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePah);
      }
    }

    user.avatar = avatarFilename;

    await userRespository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
