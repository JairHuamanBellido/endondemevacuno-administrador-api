export class InflowDITokens {
  // Service
  public static readonly CreateInflowService: unique symbol = Symbol(
    'CreateInflowService',
  );

  // repository
  public static readonly IInflowRepository: unique symbol =
    Symbol('IInflowRepository');
}
