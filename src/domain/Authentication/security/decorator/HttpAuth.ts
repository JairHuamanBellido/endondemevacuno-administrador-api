import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/core/enums/UsersRoleEnum';
import { HttpJwtAuthGuard } from '../guard/HttpJwtGuard';
import { HttpRoleAuthGuard } from '../guard/HttpRoleAuthGuard';

export const HttpAuth = (...roles: UserRole[]): ((...args: any) => void) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(HttpJwtAuthGuard, HttpRoleAuthGuard),
  );
};
