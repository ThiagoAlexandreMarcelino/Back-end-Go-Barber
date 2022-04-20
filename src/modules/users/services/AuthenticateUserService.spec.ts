import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

describe('Authenticate User', () => {
  it('Should be able to authenticate a user', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
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
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const authenticateUserService = new AuthenticateUserService(
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
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
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
