export class InventoryDITokens {
  // Services
  public static readonly CreateInventoryService: unique symbol = Symbol(
    'CreateInventoryService',
  );

  // Repository
  public static readonly IIventoryRepository: unique symbol = Symbol(
    'IIventoryRepository',
  );
}
