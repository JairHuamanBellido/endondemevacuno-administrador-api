export class VaccineCenterDITokens {
  // Services
  public static readonly CreateVaccineCenterService: unique symbol = Symbol(
    'CreateVaccineCenterService',
  );

  // Repository
  public static readonly IVaccineCenterRepository: unique symbol = Symbol(
    'IVaccineCenterRepository',
  );
}
