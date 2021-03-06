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

  public static readonly UpdateResponsableService: unique symbol = Symbol(
    'UpdateResponsableService',
  );

  public static readonly FlagCreateVaccinationCenterService: unique symbol =
    Symbol('FlagCreateVaccinationCenterService');

  public static readonly GetPersonalInformationService: unique symbol = Symbol(
    'GetPersonalInformationService',
  );

  // Repository
  public static readonly IResponsableRepository: unique symbol = Symbol(
    'IResponsableRepository',
  );

  public static readonly SendgridRepository: unique symbol =
    Symbol('SendgridRepository');
}
