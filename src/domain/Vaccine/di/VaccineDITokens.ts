export class VaccineDITokens {
  // Service
  public static readonly GetAllVacinesService: unique symbol = Symbol(
    'GetAllVacinesService',
  );
  // Repository
  public static readonly IVaccineRepository: unique symbol =
    Symbol('IVaccineRepository');
}
