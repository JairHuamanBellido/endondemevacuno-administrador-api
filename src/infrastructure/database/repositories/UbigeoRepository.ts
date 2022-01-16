import { QueryUbigeoDto } from '@domain/Ubigeo/dto/infrastructure/QueryUbigeoDto';
import { IUbigeoRepository } from '@domain/Ubigeo/interface/IUbigeoRepository.interface';
import { Ubigeo } from '@domain/Ubigeo/model/Ubigeo';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { TypeOrmUbigeo } from '../entity/TypeOrmUbigeo.entity';
import { TypeOrmUbigeoMapper } from '../mappers/TypeOrmUbigeoMapper';

type UbigeoQueryBuilder = SelectQueryBuilder<TypeOrmUbigeo>;

@EntityRepository(TypeOrmUbigeo)
export abstract class TypeOrmUbigeoRepository
  extends Repository<TypeOrmUbigeo>
  implements IUbigeoRepository {
  public async getAll(): Promise<Ubigeo[]> {

    const query = this.buildAccountQueryBuilder();
    const ormUbigeo = await query.getMany()

    return TypeOrmUbigeoMapper.toDomainEntities(ormUbigeo)

  }
  private readonly ubigeoAlias: string = 'ubigeo';

  public async getBy(queryUbigeoDto: QueryUbigeoDto): Promise<Ubigeo> {
    let domainUbigeo: Ubigeo;

    const query = this.buildAccountQueryBuilder();
    this.extendQueryWithFindByAnyCoincidence(query, queryUbigeoDto);
    const ormUbigeo = await query.getOne();

    if (ormUbigeo) {
      domainUbigeo = TypeOrmUbigeoMapper.toDomainEntity(ormUbigeo);
    }
    return domainUbigeo;
  }

  private buildAccountQueryBuilder(): UbigeoQueryBuilder {
    return this.createQueryBuilder(this.ubigeoAlias).select();
  }

  private extendQueryWithFindByAnyCoincidence(
    query: UbigeoQueryBuilder,
    by?: QueryUbigeoDto,
  ) {
    if (by.id) {
      query.orWhere(`"${this.ubigeoAlias}".id = :id`, { id: by.id });
    }
    if (by.department) {
      query.orWhere(`"${this.ubigeoAlias}".department = :department `, {
        department: by.department,
      });
    }
    if (by.district) {
      query.orWhere(`"${this.ubigeoAlias}".district = :district `, {
        district: by.district,
      });
    }
    if (by.province) {
      query.orWhere(`"${this.ubigeoAlias}".province = :province `, {
        province: by.province,
      });
    }
  }
}
