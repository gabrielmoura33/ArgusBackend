// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;
describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });
  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'johndoew@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset the password with non existing token', async () => {
    await expect(
      resetPassword.execute({
        password: '1232141',
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset the password with non existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existingUser',
    );

    await expect(
      resetPassword.execute({
        password: '1232141',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset the password if past more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'johndoew@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await resetPassword.execute({
      password: '123123',
      token,
    });

    await expect(
      resetPassword.execute({
        password: '1232141',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
