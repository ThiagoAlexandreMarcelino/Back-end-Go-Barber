import AppError from '@shared/errors/AppError';
// import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeEmailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });
  it('Should be able to recover the password using e-mail', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendEmail');

    await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'thiago@thiago.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'thiago@thiago.com',
    });

    expect(sendEmail).toHaveBeenCalled();
  });

  it('Should not be able to recover the password to a non-existing user', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({ email: 'thiago@thiago.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should generate a forgot password token ', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'thiago@thiago.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'thiago@thiago.com',
    });

    await expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
