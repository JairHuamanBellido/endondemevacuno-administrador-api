import { GetSecretValueResponse } from 'aws-sdk/clients/secretsmanager';
import { config } from 'dotenv';
import { AwsSecretManager, IAwsSecretManager } from './AwsSecretManager';
config();

export class SystemConfig {
  public static readonly NODE_ENV: string = process.env.NODE_ENV;

  public async getConfiguration() {
    if (process.env.NODE_ENV !== 'development') {
      const { session } = new AwsSecretManager();
      const { SecretString }: GetSecretValueResponse = await session
        .getSecretValue({ SecretId: 'prod/EnDondeMeVacuno' })
        .promise();
      const { EnDondeMeVacunoJwtKey, EnDondeMeVacunoPasswordKey } = JSON.parse(
        SecretString,
      ) as IAwsSecretManager;
      return {
        JwtKey: EnDondeMeVacunoJwtKey,
        PasswordKey: EnDondeMeVacunoPasswordKey,
      };
    }
    return {
      JwtKey: process.env.JWT_KEY,
      PasswordKey: process.env.CRYPTOJS_KEY,
    };
  }
}
