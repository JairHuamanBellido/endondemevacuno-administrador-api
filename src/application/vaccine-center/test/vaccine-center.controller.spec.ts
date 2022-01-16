import { Test, TestingModule } from '@nestjs/testing';
import { VaccineCenterController } from '../controller/vaccine-center.controller';

describe('VaccineCenterController', () => {
  let controller: VaccineCenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccineCenterController],
    }).compile();

    controller = module.get<VaccineCenterController>(VaccineCenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
