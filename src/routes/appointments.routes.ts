import {Router} from 'express';
import {startOfHour,parseISO} from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository'
// import Appointment from '../models/Appointment';

const appoitmentsRouter = Router();


const appointmentsRepository = new AppointmentsRepository(); 

appoitmentsRouter.get('/', (request,response) =>{
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
})

appoitmentsRouter.post('/',(request,response)=>{
    const {provider, date} = request.body;

    const parsedDate = startOfHour(parseISO(date))

    const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate)

    if(findAppointmentInSameDate){
        return response
            .status(400)
            .json({mensage: "This appointment is already booked"})
    }

    const appointment = appointmentsRepository.create({
        provider,
        date : parsedDate,
    })
    

    return response.json(appointment);

})

export default appoitmentsRouter;