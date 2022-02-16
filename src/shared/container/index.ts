import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

import '@modules/users/providers'

import { container } from "tsyringe";


container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository)


container.register<IAppointmentsRepository>(
  "AppointmentsRepository",
  AppointmentsRepository)
