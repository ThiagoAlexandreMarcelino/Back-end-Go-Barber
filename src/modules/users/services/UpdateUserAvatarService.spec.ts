
import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";

import FakeStorageProvider from "@shared/container/providers/StorageProviders/fakes/FakeStorageProvider"

import UpdateUserAvatarService from "./UpdateUserAvatarService";


describe("Update User Avatar", ()=>{

  it("Should be able to update a user avatar", async ()=>{
    const fakeStorageProvider  = new FakeStorageProvider()
    const fakeUsersRepository = new FakeUsersRepository()


    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider);

    const user = await fakeUsersRepository.create({
        name: 'Thiago',
        email:'blablabla@email.com',
        password: '12345',
      })

      await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename:'avatar.jpg'
      })


      expect(user.avatar).toBe('avatar.jpg')

  })



  it("Should not be able to update user avatar a non-exinting user", async ()=>{
    const fakeStorageProvider  = new FakeStorageProvider()
    const fakeUsersRepository = new FakeUsersRepository()


    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider);


      await expect(updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename:'avatar.jpg'
      })).rejects.toBeInstanceOf(AppError)

  })


  it("Should delete old avatar when updating new one", async ()=>{
    const fakeStorageProvider  = new FakeStorageProvider()
    const fakeUsersRepository = new FakeUsersRepository()

    const deleteFile = jest.spyOn(fakeStorageProvider,'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider);

    const user = await fakeUsersRepository.create({
        name: 'Thiago',
        email:'blablabla@email.com',
        password: '12345',
      })

      await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename:'avatar.jpg'
      })

      await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename:'new_avatar.jpg'
      })


      expect(deleteFile).toBeCalledWith('avatar.jpg')
      expect(user.avatar).toBe('new_avatar.jpg')

  })


})
