import { HttpRestApiCreateResponsable as Payload } from '@application/responsable/documentation/HttpRestApiCreateResponsable';
import { SendgridAdapter } from '@infrastructure/adapters/SendgridAdapter';

export class GenerateCredentialService {
  constructor(private readonly sendgridAdapter: SendgridAdapter) {}

  public async eee(payload: Payload, password: string): Promise<any> {
    const createResponsable: Payload = {
      dni: payload.dni,
      email: payload.email,
      lastname: payload.lastname,
      name: payload.name,
    };

    await this.sendgridAdapter.sendEmail({
      destination: payload.email,
      subject: 'Tus credenciales',
      text: `Tus credeciales son correo: ${createResponsable.email}, contraseña: ${password}`,
    });

    return { message: 'Enviado' };
  }
}
