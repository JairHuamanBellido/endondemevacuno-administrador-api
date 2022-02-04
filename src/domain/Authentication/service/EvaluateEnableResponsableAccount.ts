import { Responsable } from '@domain/Responsable/model/Responsable';
import { UpdateResponsableService } from '@domain/Responsable/service/UpdateResponsableService';
import { IAuthenticateTrackingRepository } from '../interface/IAuthenticateTrackingRepository.interface';
import { AuthenticateTracking } from '../model/AuthenticateTracking';

export class EvaluateEnableResponsableAccount {
    private _accountLockoutTime = 10;

    constructor(
        private readonly authenticateTrackingRepository: IAuthenticateTrackingRepository,
        private readonly updateResponsableService: UpdateResponsableService
    ) { }

    public async execute(responsable: Responsable): Promise<Boolean> {
        let result = await this.shouldAccountBlocked(responsable);
        if (!result)
            await this.updateResponsableService.execute({
                id: responsable.id,
                isEnabled: true
            })
        return !result;

    }

    private async shouldAccountBlocked(responsable: Responsable) {
        let auhenticateTracking = await this.getLoginFailed(responsable);
        auhenticateTracking.createdAt.setMinutes(auhenticateTracking.createdAt.getMinutes() + this._accountLockoutTime);
        return auhenticateTracking.createdAt >= new Date(Date.now());
    }

    private async getLoginFailed(responsable: Responsable): Promise<AuthenticateTracking> {
        let logins = await this.authenticateTrackingRepository.findBy({
            result: false,
            responsableId: responsable.id,
        });
        return logins.slice(0, 1)[0];
    }
}
