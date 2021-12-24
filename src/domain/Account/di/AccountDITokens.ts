export class AccountDITokens {
  // service
  public static readonly CreateAccountService: unique symbol = Symbol(
    'CreateAccountService',
  );

  // repository
  public static readonly IAccountRepository: unique symbol =
    Symbol('IAccountRepository');
}
