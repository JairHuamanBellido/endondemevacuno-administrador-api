import { Responsable } from "@domain/Responsable/model/Responsable";

export type RegisterAuthenticateTrackingEntityPayload = {
    id: string;
    result: boolean;
    responsable: Responsable;
    createdAt: Date;
  };
  