import { Expose } from 'class-transformer';

export class AuthenticationResponseDto {
  @Expose()
  public token: string;

  @Expose()
  public userId: string;
}
