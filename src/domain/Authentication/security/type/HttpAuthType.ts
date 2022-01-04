import { Request } from 'express';
import { UserRole } from 'src/core/enums/UsersRoleEnum';

/**
 * Payload del JWT
 */
export type HttpJwtPayload = {
  id: string;
  email: string;
  role: UserRole;
  responsableId: string | undefined;
};

/**
 * Respuesta del servicio API REST para el usuario autenticado
 */
export type HttpLoggedUser = {
  id: string;
  accessToken: string;
};

/**
 * Cabecera del servicio de Bearer, parseando el JWT TOKEN
 */
export type HttpRequestWithUser = Request & { user: HttpJwtPayload };
