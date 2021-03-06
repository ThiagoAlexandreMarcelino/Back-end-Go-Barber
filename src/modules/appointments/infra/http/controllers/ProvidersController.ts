import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      user_id: provider_id,
    });

    return response.json(providers);
  }
}
