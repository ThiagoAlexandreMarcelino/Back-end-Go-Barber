import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body;
    const { provider_id } = request.params;

    const providersDayAvailability = container.resolve(ProviderDayAvailability);

    const availability = await providersDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(availability);
  }
}
