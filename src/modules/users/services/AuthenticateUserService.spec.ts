import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import AuthenticateUserService from './AuthenticateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let authenticateUserService: AuthenticateUserService;
// let createUserService: CreateUserService;

describe('Authenticate User', () => {
  it('Should be able to authenticate a user', async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'blablabla@email.com',
      password: '12345',
    });

    const response = await authenticateUserService.execute({
      email: 'blablabla@email.com',
      password: '12345',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Should not be able to authenticate a non existing user', async () => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUserService.execute({
        email: 'blablabla@email.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with a wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'blablabla@email.com',
      password: '12345',
    });

    expect(
      authenticateUserService.execute({
        email: 'blablabla@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
