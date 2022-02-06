export class VaccineCenterDITokens {
  // Services
  public static readonly CreateVaccineCenterService: unique symbol = Symbol(
    'CreateVaccineCenterService',
  );

  public static readonly UpdateVaccineCenterService: unique symbol = Symbol(
    'UpdateVaccineCenterService',
  );

  public static readonly GetVaccineCenterService: unique symbol = Symbol(
    'GetVaccineCenterService',
  );

  // Repository
  public static readonly IVaccineCenterRepository: unique symbol = Symbol(
    'IVaccineCenterRepository',
  );
}
