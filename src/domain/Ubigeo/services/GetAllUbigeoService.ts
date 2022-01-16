import { IUbigeoRepository } from "../interface/IUbigeoRepository.interface";
import { Ubigeo } from "../model/Ubigeo";

export class GetAllUbigeoService {
    constructor(
        private readonly ubigeoRepository: IUbigeoRepository
    ) { }

    public async execute(): Promise<Ubigeo[]> {
        return await this.ubigeoRepository.getAll()
    }

}