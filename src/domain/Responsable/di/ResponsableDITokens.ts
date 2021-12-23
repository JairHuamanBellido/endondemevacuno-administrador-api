export class ResponsableDITokens {
  // Service
  public static readonly GetAllResponsablesService: unique symbol = Symbol(
    'GetAllResponsablesService',
  );
  // Repository
  public static readonly IResponsableRepository: unique symbol = Symbol(
    'IResponsableRepository',
  );
}
