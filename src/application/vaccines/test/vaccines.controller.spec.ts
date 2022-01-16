import { Test, TestingModule } from '@nestjs/testing';
import { VaccinesController } from '../controller/vaccines.controller';

describe('VaccinesController', () => {
  let controller: VaccinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinesController],
    }).compile();

    controller = module.get<VaccinesController>(VaccinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
