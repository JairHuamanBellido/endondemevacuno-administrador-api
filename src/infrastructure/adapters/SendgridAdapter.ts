import { EmailResponsableDto } from '@domain/Responsable/dto/infrastructure/EmailResponsableDto';
import { SendgridConfig } from '@infrastructure/config/SendgridConfig';
import { Client } from '@sendgrid/client';
import sgMail = require('@sendgrid/mail');

export class SendgridAdapter {
  public async sendEmail(payload: EmailResponsableDto): Promise<void> {
    const session = new SendgridConfig();

    sgMail.setClient(new Client());
    sgMail.setApiKey(await session.getApiKey());
    await sgMail
      .send({
        from: 'jairhbdev@gmail.com',
        text: payload.text,
        to: payload.destination,
        subject: payload.subject,
      })
      .then((v) => {
        console.log('Enviando exitosamente');
        console.log(v);
      })
      .catch((e) => {
        console.error(e);
      });
  }
}
