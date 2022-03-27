export class InventoryDITokens {
  // Services
  public static readonly CreateInventoryService: unique symbol = Symbol(
    'CreateInventoryService',
  );

  public static readonly GetInvetoryByVaccineCenterService: unique symbol =
    Symbol('GetInvetoryByVaccineCenterService');

  public static readonly DeleteVaccineToInventoryService: unique symbol =
    Symbol('DeleteVaccineToInventoryService');

  // Repository
  public static readonly IIventoryRepository: unique symbol = Symbol(
    'IIventoryRepository',
  );
}
