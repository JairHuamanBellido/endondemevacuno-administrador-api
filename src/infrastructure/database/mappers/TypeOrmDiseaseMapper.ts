import { Disease } from '@domain/Disease/model/Disease';
import { TypeOrmDisease } from '../entity/TypeOrmDisease.entity';

export class TypeOrmDiseaseMapper {
  public static toDomainEntity(ormDisease: TypeOrmDisease): Disease {
    const domainDisease = new Disease({
      createdAt: ormDisease.created_at,
      description: ormDisease.description,
      id: ormDisease.id,
      name: ormDisease.name,
    });
    return domainDisease;
  }

  public static toOrmEntity(disease: Disease): TypeOrmDisease {
    const ormDisease: TypeOrmDisease = {
      created_at: disease.createdAt,
      description: disease.description,
      id: disease.id,
      name: disease.name,
    };
    return ormDisease;
  }
}
