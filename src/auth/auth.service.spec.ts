jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const token = 'my-token-foo'

describe('AuthService tests', () => {
  let service: AuthService;

  const mockUsersService = {
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue(token),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw if user was not found', async () => {
    mockUsersService.findByEmail.mockResolvedValue(null);

    await expect(service.validateUser('a', 'b'))
      .rejects
      .toThrow(UnauthorizedException);
  });

  it('should show an error if password is wrong', async () => {
    mockUsersService.findByEmail.mockResolvedValue({
      id: '1',
      email: 'a',
      password: 'hashed',
      role: 'admin',
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(service.validateUser('a', 'b'))
      .rejects
      .toThrow();
  });


  it('should return user when is valid', async () => {
    const user = {
      id: '1',
      email: 'test@gmail.com',
      password: 'hashed',
      role: 'admin',
    };

    mockUsersService.findByEmail.mockResolvedValue(user);

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await service.validateUser('test@gmail.com', 'hashed');

    expect(result).toEqual(user);
  });


  it('should generate jwt token', async () => {
    const result = await service.login({
      id: '1',
      role: 'admin',
    } as any);

    expect(result).toEqual({
      access_token: token,
    });
  });
});
