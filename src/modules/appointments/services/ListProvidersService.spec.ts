import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('List Providers', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('Should be able to list all providers', async () => {
    const user_1 = await fakeUsersRepository.create({
      name: 'Thiago 1',
      email: 'me@email_1.com',
      password: '12345',
    });
    const user_2 = await fakeUsersRepository.create({
      name: 'Thiago 2',
      email: 'me@email_2.com',
      password: '12345',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Thiago Logado',
      email: 'me@email_2.com',
      password: '12345',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user_1, user_2]);
  });
});
