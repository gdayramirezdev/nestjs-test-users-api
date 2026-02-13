import { Test, TestingModule } from '@nestjs/testing';
import { GhibliController } from './ghibli.controller';
import { GhibliService } from './ghibli.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../common/guards/roles.guard';

describe('GhibliController tests', () => {
  let controller: GhibliController;

  const mockService = {
    getByRole: jest.fn().mockResolvedValue([]),
  };

  const mockGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GhibliController],
      providers: [{ provide: GhibliService, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .overrideGuard(RoleGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<GhibliController>(GhibliController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined()
  });

  it('should return category', async () => {
    const result = await controller.getByCategory('films');

    expect(result).toEqual([]);
    expect(mockService.getByRole).toHaveBeenCalledWith('films');
  });
});
