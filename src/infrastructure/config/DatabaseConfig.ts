import { GetSecretValueResponse } from 'aws-sdk/clients/secretsmanager';
import { AwsSecretManager, IAwsSecretManager } from './AwsSecretManager';

export class DatabaseConfig {
  public async getCredentials() {
    const { session } = new AwsSecretManager();

    const { SecretString }: GetSecretValueResponse = await session
      .getSecretValue({ SecretId: 'prod/EnDondeMeVacuno' })
      .promise();

    return JSON.parse(SecretString) as IAwsSecretManager;
  }
}
