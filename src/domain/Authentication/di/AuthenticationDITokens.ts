export class AuthenticationDITokens {
  // Service
  public static readonly AuthenticationAdminService: unique symbol = Symbol(
    'AuthenticationAdminService',
  );

  public static readonly HttpJwtStrategy: unique symbol =
    Symbol('HttpJwtStrategy');

  // Repository
  public static readonly IAccountRepository: unique symbol =
    Symbol('IAccountRepository');
}
