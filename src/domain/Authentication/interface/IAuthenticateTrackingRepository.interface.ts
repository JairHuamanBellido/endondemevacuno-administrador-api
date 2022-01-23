import { QueryAuthenticateTrackingDto } from "../dto/infrastructure/QueryAuthenticateTrackingDto";
import { AuthenticateTracking } from "../model/AuthenticateTracking";

export interface IAuthenticateTrackingRepository {
  getBy(queryAuthenticateTrackingDto: QueryAuthenticateTrackingDto): Promise<AuthenticateTracking>;
  createEntity(authenticateTracking: AuthenticateTracking): Promise<AuthenticateTracking>;
  findBy(queryAuthenticateTrackingDto: QueryAuthenticateTrackingDto): Promise<AuthenticateTracking[]>;
}
