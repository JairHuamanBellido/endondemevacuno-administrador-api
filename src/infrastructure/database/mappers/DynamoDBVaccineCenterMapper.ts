import { VaccineCenter } from '@domain/VaccineCenter/model/VaccineCenter';
import { VaccineCenterDynamoDB } from '../entityDynamoDB/VaccineCenterDynamoDB.entity';

export class DynamoDBVaccineCenterMapper {
  public static toDynamoDBEntity(
    vaccineCenter: VaccineCenter,
  ): VaccineCenterDynamoDB {
    return {
      business_hour: { S: vaccineCenter.businessHour },
      created_at: { S: vaccineCenter.createdAt.toISOString() },
      direction: { S: vaccineCenter.direction },
      diris: { S: vaccineCenter.diris },
      district: { S: vaccineCenter.ubigeo.district },
      id: { S: vaccineCenter.id },
      is_available: { BOOL: vaccineCenter.isAvailable },
      localization: { S: vaccineCenter.localization },
      name: { S: vaccineCenter.name },
      vaccines: vaccineCenter.inventories
        ? {
            L: vaccineCenter.inventories.map((e) => ({ S: e.vaccine.name })),
          }
        : undefined,
    };
  }
}
