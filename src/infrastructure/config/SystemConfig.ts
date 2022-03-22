import { GetSecretValueResponse } from 'aws-sdk/clients/secretsmanager';
import { config } from 'dotenv';
import { AwsSecretManager, IAwsSecretManager } from './AwsSecretManager';
config();

export class SystemConfig {
  public static readonly NODE_ENV: string = process.env.NODE_ENV;

  public async getConfiguration() {
    const { session } = new AwsSecretManager();
    const { SecretString }: GetSecretValueResponse = await session
      .getSecretValue({ SecretId: 'prod/EnDondeMeVacuno' })
      .promise();
    const { EnDondeMeVacunoJwtKey, EnDondeMeVacunoPasswordKey } = JSON.parse(
      SecretString,
    ) as IAwsSecretManager;
    return {
      JwtKey: process.env.JWT_KEY || EnDondeMeVacunoJwtKey,
      PasswordKey: process.env.CRYPTOJS_KEY || EnDondeMeVacunoPasswordKey,
    };
  }
}
