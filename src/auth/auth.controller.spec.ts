import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController tests', () => {
  let controller: AuthController;

  const mockService = {
    validateUser: jest.fn().mockResolvedValue({ id: '1' }),
    login: jest.fn().mockResolvedValue({ access_token: 'token' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockService }],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should user be authenticated', async () => {
    const result = await controller.login({
      email: 'test@test.com',
      password: '123456',
    })

    expect(result).toEqual({ access_token: 'token' })
    expect(mockService.validateUser).toHaveBeenCalled()
    expect(mockService.login).toHaveBeenCalled()
  });
});
