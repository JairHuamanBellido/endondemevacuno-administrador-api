import { config } from 'dotenv';
import { AwsSecretManager, IAwsSecretManager } from './AwsSecretManager';
import { GetSecretValueResponse } from 'aws-sdk/clients/secretsmanager';

config();
export class SendgridConfig {
  public static readonly API_KEY: string = process.env.SENDGRID_API_KEY;

  public async getApiKey() {
    if (process.env.NODE_ENV !== 'development') {
      const { session } = new AwsSecretManager();
      const { SecretString }: GetSecretValueResponse = await session
        .getSecretValue({ SecretId: 'prod/EnDondeMeVacuno' })
        .promise();
      const { EnDondeMeVacunoSendgrid } = JSON.parse(
        SecretString,
      ) as IAwsSecretManager;
      return EnDondeMeVacunoSendgrid;
    }
    return process.env.SENDGRID_API_KEY;
  }
}
