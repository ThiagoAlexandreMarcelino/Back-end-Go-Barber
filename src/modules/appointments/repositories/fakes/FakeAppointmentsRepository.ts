import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 } from 'uuid';
import { isEqual } from 'date-fns';
import IAppointmentsRepository from '../IAppointmentsRepository';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: v4(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const foundappointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return foundappointment;
  }
}
export default FakeAppointmentsRepository;
