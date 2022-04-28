import { Router } from 'express';
// import { parseISO } from 'date-fns';
// import { container } from 'tsyringe';

// import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
// import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
// import Appointment from '../models/Appointment';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();

const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticated);

providersRouter.post('/', providersController.index);

export default providersRouter;
