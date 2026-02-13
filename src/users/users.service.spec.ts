import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    const users = [{ id: '1' }];
    mockUserRepository.find.mockResolvedValue(users);

    const result = await service.findAll();

    expect(result).toEqual(users);
    expect(mockUserRepository.find).toHaveBeenCalled();
  });

  it('should find one user', async () => {
    const user = { id: '1' };
    mockUserRepository.findOne.mockResolvedValue(user);

    const result = await service.findOne('1');

    expect(result).toEqual(user);
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should create user', async () => {
    mockUserRepository.findOne.mockResolvedValue(null);
    ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashed');

    mockUserRepository.create.mockReturnValue({});
    mockUserRepository.save.mockResolvedValue({ id: '1' });

    const result = await service.create({
      email: 'test@test.com',
      password: '123456',
    } as any);

    expect(result).toEqual({ id: '1' });
    expect(bcrypt.hash).toHaveBeenCalled();
    expect(mockUserRepository.save).toHaveBeenCalled();
  });

  it('should throw if an email already exists', async () => {
    mockUserRepository.findOne.mockResolvedValue({ id: '1' });

    await expect(
      service.create({
        email: 'test@test.com',
        password: '123456',
      } as any),
    ).rejects.toThrow();
  });

  it('should update one user', async () => {
    mockUserRepository.update.mockResolvedValue({});

    await service.update('1', {} as any);

    expect(mockUserRepository.update).toHaveBeenCalledWith('1', {});
  });

  it('should delete one user', async () => {
    mockUserRepository.delete.mockResolvedValue({});

    await service.delete('1');

    expect(mockUserRepository.delete).toHaveBeenCalledWith('1');
  });

  it('should find user by email', async () => {
    const user = { email: 'a@test.com' };
    mockUserRepository.findOne.mockResolvedValue(user);

    const result = await service.findByEmail('a@test.com');

    expect(result).toEqual(user);
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { email: 'a@test.com' },
    });
  });
});
