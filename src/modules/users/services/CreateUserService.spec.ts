
import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider"

describe("CreateUser", ()=>{

  it("Should be able to create a new user", async ()=>{

    const fakeHashProvider  = new FakeHashProvider()
    const fakeUsersRepository = new FakeUsersRepository()
    const createUserService = new CreateUserService(fakeUsersRepository,fakeHashProvider);

   const user = await createUserService.execute({
      name: 'Thiago',
      email:'blablabla@email.com',
      password: '12345'
    })

    expect(user).toHaveProperty('id')
  })


  it("Should not be able to create a new user with same e-mail", async ()=>{

    const fakeHashProvider  = new FakeHashProvider()
    const fakeUsersRepository = new FakeUsersRepository()
    const createUserService = new CreateUserService(fakeUsersRepository,fakeHashProvider);

   await createUserService.execute({
      name: 'Thiago',
      email:'blablabla@email.com',
      password: '12345'
    })

    expect(createUserService.execute({
      name: 'Thiagoo',
      email:'blablabla@email.com',
      password: '12345'
    })

    ).rejects.toBeInstanceOf(AppError)
  })

})

