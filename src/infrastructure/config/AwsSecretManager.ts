import { SecretsManager } from 'aws-sdk';

export interface IAwsSecretManager {
  EnDondeMeVacunoDatabaseHost: string;
  EnDondeMeVacunoDatabaseUser: string;
  EnDondeMeVacunoDatabasePassword: string;
  EnDondeMeVacunoDatabaseName: string;
  EnDondeMeVacunoDatabasePort: string;
  EnDondeMeVacunoSendgrid: string;
  EnDondeMeVacunoJwtKey: string;
  EnDondeMeVacunoPasswordKey: string;
}

export class AwsSecretManager {
  public session: SecretsManager;

  constructor() {
    if (process.env.NODE_ENV !== 'development') {
      this.session = new SecretsManager({
        region: 'us-east-2',
      });
    }
  }
}
