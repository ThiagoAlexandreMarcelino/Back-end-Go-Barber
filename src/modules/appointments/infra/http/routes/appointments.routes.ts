import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);

// {

// const appointmentsRepository = new AppointmentsRepository();
// const { provider_id, date } = request.body;

// const parsedDate = await parseISO(date);

// const createAppointment = new CreateAppointmentService(
//   appointmentsRepository,
// );

// sem injeção de dependencia
// const createAppointment = new CreateAppointmentService(appointmentsRepository);

// com injeção de dependecia
// const createAppointment =  container.resolve(CreateAppointmentService);

// const appointment = await createAppointment.execute({
//   date: parsedDate,
//   provider_id,
// });

// return response.json(appointment);

// });

export default appointmentsRouter;
