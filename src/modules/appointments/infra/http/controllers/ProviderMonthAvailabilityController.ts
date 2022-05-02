import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ProviderMonthAvailability from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { year, month } = request.body;
    const { provider_id } = request.params;

    const providersMonthAvailability = container.resolve(
      ProviderMonthAvailability,
    );

    const availability = await providersMonthAvailability.execute({
      provider_id,
      year,
      month,
    });

    return response.json(availability);
  }
}
