import { IVaccineCenterRepositoryDynamoDB } from '@domain/VaccineCenter/interface/IvaccineCenterRepositoryDynamoDB.interface';
import { VaccineCenter } from '@domain/VaccineCenter/model/VaccineCenter';
import { dynamoDB } from '../dynamoDB';
import { DynamoDBVaccineCenterMapper } from '../mappers/DynamoDBVaccineCenterMapper';
export class VaccineCenterRepositoryDynamoDB
  implements IVaccineCenterRepositoryDynamoDB
{
  private readonly vaccineCenterAlias = 'vaccine_center';

  public async create(vaccineCenter: VaccineCenter) {
    await dynamoDB
      .putItem({
        TableName: this.vaccineCenterAlias,
        Item: DynamoDBVaccineCenterMapper.toDynamoDBEntity(vaccineCenter),
      })
      .promise();
  }

  public async update(vaccineCenter: VaccineCenter) {
    const vaccineCenterDynamoDB =
      DynamoDBVaccineCenterMapper.toDynamoDBEntity(vaccineCenter);

    await dynamoDB
      .updateItem({
        TableName: this.vaccineCenterAlias,
        Key: {
          id: { S: vaccineCenterDynamoDB.id.S },
        },
        AttributeUpdates: {
          is_available: {
            Value: { BOOL: vaccineCenterDynamoDB.is_available.BOOL },
          },
          business_hour: {
            Value: { S: vaccineCenterDynamoDB.business_hour.S },
          },
        },
      })
      .promise();
  }
  public async updateVaccines(vaccineCenter: VaccineCenter) {
    const vaccineCenterDynamoDB =
      DynamoDBVaccineCenterMapper.toDynamoDBEntity(vaccineCenter);

    await dynamoDB
      .updateItem({
        TableName: this.vaccineCenterAlias,
        Key: {
          id: { S: vaccineCenterDynamoDB.id.S },
        },
        AttributeUpdates: {
          vaccines: {
            Value: { L: vaccineCenterDynamoDB.vaccines.L },
          },
        },
      })
      .promise();
  }
}
