export class ResponsableDITokens {
  // Service
  public static readonly GetAllResponsablesService: unique symbol = Symbol(
    'GetAllResponsablesService',
  );

  public static readonly CreateResponsableService: unique symbol = Symbol(
    'CreateResponsableService',
  );

  public static readonly GenerateCredentialService: unique symbol = Symbol(
    'GenerateCredentialService',
  );

  // Repository
  public static readonly IResponsableRepository: unique symbol = Symbol(
    'IResponsableRepository',
  );

  public static readonly SendgridRepository: unique symbol =
    Symbol('SendgridRepository');
}
