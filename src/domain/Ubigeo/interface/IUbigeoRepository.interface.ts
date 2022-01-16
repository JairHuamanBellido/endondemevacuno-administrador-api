import { QueryUbigeoDto } from "../dto/infrastructure/QueryUbigeoDto";
import { Ubigeo } from "../model/Ubigeo";


export interface IUbigeoRepository {
  getBy(queryUbigeoDto: QueryUbigeoDto): Promise<Ubigeo>;

}
