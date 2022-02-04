import { UpdateResponsableService } from '@domain/Responsable/service/UpdateResponsableService';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticateTrackingDto as Payload } from '../dto/application/AuthenticateTrackingDto';
import { IAuthenticateTrackingRepository } from '../interface/IAuthenticateTrackingRepository.interface';
import { AuthenticateTracking } from '../model/AuthenticateTracking';

export class AuthenticateTrackingService {
    private _timePeriodFailure = 60000 * 10;
    private _maxNumberFailedAttempts = 3;

    constructor(
        private readonly authenticateTrackingRepository: IAuthenticateTrackingRepository,
        private readonly updateResponsableService: UpdateResponsableService
    ) { }

    public async execute(registerAuhenticateTracking: Payload): Promise<AuthenticateTracking> {
        let authenticateTracking = await this.registerAuhenticateTracking(registerAuhenticateTracking);
        let failed = await this.shouldAccountBlocked(registerAuhenticateTracking);
        if (failed)
            await this.updateResponsableService.execute({
                id: registerAuhenticateTracking.responsable.id,
                isEnabled: false
            })

        return authenticateTracking;
    }

    private async registerAuhenticateTracking(registerAuhenticateTracking: Payload): Promise<AuthenticateTracking> {
        const authenticateTracking: AuthenticateTracking = new AuthenticateTracking({
            createdAt: new Date(),
            id: uuidv4(),
            result: registerAuhenticateTracking.result,
            responsable: registerAuhenticateTracking.responsable,
        });
        const newAutenticateTracking = await this.authenticateTrackingRepository.createEntity(authenticateTracking);
        return newAutenticateTracking;
    }

    private async shouldAccountBlocked(registerAuhenticateTracking: Payload) {
        let failed = await this.getLoginFailed(registerAuhenticateTracking);
        return failed >= this._maxNumberFailedAttempts;
    }

    private async getLoginFailed(registerAuhenticateTracking: Payload): Promise<Number> {
        let logins = await this.authenticateTrackingRepository.findBy({
            fromDate: new Date(Date.now() - this._timePeriodFailure),
            responsableId: registerAuhenticateTracking.responsable.id,
        });
        return logins.slice(0, this._maxNumberFailedAttempts).filter(login => !login.result).length;
    }
}
