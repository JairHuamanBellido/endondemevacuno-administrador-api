export class UbigeoDITokens {
  // Service
  public static readonly GetAllUbigeoService: unique symbol = Symbol(
    'GetAllUbigeoService',
  );
  // Repository
  public static readonly IUbigeoRepository: unique symbol =
    Symbol('IUbigeoRepository');
}
