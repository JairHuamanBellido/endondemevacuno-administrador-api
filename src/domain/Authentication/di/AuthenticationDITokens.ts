export class AuthenticationDITokens {
  // Service
  public static readonly AuthenticationService: unique symbol = Symbol(
    'AuthenticationService',
  );
  // Repository
  public static readonly IAccountRepository: unique symbol =
    Symbol('IAccountRepository');
}
