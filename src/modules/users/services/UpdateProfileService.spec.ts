import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe('Update Profile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'blablabla@email.com',
      password: '12345',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'User Updated',
      old_password: '12345',
      password: '12345',
      email: 'emailuser@updated.com',
    });

    expect(updatedUser.name).toBe('User Updated');
    expect(updatedUser.email).toBe('emailuser@updated.com');
  });

  it('Should not be able to use an email of another user', async () => {
    await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'me@email.com',
      password: '12345',
    });

    const user = await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'thiago@email.com',
      password: '12345',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'User Updated',
        old_password: '123456',
        password: '123456',
        email: 'me@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'me@email.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'User Updated',
      email: 'me@email.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('Should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'me@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'User Updated',
        email: 'me@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the password with the wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'me@email.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'User Updated',
      email: 'me@email.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });
});
