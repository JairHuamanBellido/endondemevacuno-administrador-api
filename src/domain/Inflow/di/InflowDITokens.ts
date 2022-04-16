export class InflowDITokens {
  // Service
  public static readonly CreateInflowService: unique symbol = Symbol(
    'CreateInflowService',
  );

  public static readonly GetInflowBetweenDatesService: unique symbol = Symbol(
    'GetInflowBetweenDatesService',
  );
  // repository
  public static readonly IInflowRepository: unique symbol =
    Symbol('IInflowRepository');
}
