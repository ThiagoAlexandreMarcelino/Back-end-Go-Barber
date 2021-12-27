import { Router } from 'express';
// import { parseISO } from 'date-fns';
// import { container } from 'tsyringe';

// import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
// import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
// import Appointment from '../models/Appointment';

import AppointmentsController from '../controllers/AppointmentsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController()

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {

//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create)


// {

  // const appointmentsRepository = new AppointmentsRepository();
  // const { provider_id, date } = request.body;

  // const parsedDate = await parseISO(date);

    // const createAppointment = new CreateAppointmentService(
    //   appointmentsRepository,
    // );

    //sem injeção de dependencia
    // const createAppointment = new CreateAppointmentService(appointmentsRepository);

    //com injeção de dependecia
    // const createAppointment =  container.resolve(CreateAppointmentService);

    // const appointment = await createAppointment.execute({
    //   date: parsedDate,
    //   provider_id,
    // });

    // return response.json(appointment);

// });

export default appointmentsRouter;
