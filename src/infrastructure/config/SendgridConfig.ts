import { config } from 'dotenv';
config();
export class SendgridConfig {
  public static readonly API_KEY: string = process.env.SENDGRID_API_KEY;
}
