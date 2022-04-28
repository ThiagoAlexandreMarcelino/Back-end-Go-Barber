import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('Update Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('Should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'me@email.com',
      password: '12345',
    });

    const profile = await showProfile.execute({ user_id: user.id });

    expect(profile.name).toBe('Thiago');
    expect(profile.email).toBe('me@email.com');
  });

  it('Should not be able to show the profile to a non existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
