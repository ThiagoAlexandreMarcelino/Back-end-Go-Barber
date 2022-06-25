import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  it('Should be able to create a new user', async () => {
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    const user = await createUserService.execute({
      name: 'Thiago',
      email: 'blablabla@email.com',
      password: '12345',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with same e-mail', async () => {
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    await createUserService.execute({
      name: 'Thiago',
      email: 'blablabla@email.com',
      password: '12345',
    });

    expect(
      createUserService.execute({
        name: 'Thiagoo',
        email: 'blablabla@email.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
