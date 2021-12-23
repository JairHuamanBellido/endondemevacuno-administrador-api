export class AuthenticationDITokens {
  // Service
  public static readonly AuthenticationService: unique symbol = Symbol(
    'AuthenticationService',
  );

  public static readonly HttpJwtStrategy: unique symbol =
    Symbol('HttpJwtStrategy');

  // Repository
  public static readonly IAccountRepository: unique symbol =
    Symbol('IAccountRepository');
}
