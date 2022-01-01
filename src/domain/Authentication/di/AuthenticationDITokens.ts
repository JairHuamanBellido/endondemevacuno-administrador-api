export class AuthenticationDITokens {
  // Service
  public static readonly AuthenticationAdminService: unique symbol = Symbol(
    'AuthenticationAdminService',
  );

  public static readonly AuthenticationResponsableService: unique symbol =
    Symbol('AuthenticationResponsableService');

  public static readonly HttpJwtStrategy: unique symbol =
    Symbol('HttpJwtStrategy');

  // Repository
  public static readonly IAccountRepository: unique symbol =
    Symbol('IAccountRepository');
}
