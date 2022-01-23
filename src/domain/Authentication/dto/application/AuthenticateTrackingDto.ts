import { Responsable } from "@domain/Responsable/model/Responsable";

export interface AuthenticateTrackingDto {
    responsable: Responsable;
    result: boolean;
}
