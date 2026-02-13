import { Test, TestingModule } from '@nestjs/testing';
import { GhibliService } from './ghibli.service';
import axios from 'axios';
import { ForbiddenException } from '@nestjs/common';

jest.mock('axios');

describe('GhibliService tests', () => {
  let service: GhibliService;

  const mockAxios = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    (axios.create as jest.Mock).mockReturnValue(mockAxios);

    const module: TestingModule = await Test.createTestingModule({
      providers: [GhibliService],
    }).compile();

    service = module.get<GhibliService>(GhibliService);
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  })

  it('should return data when role is valid', async () => {
    mockAxios.get.mockResolvedValue({ data: [{ id: 1 }] });

    const result = await service.getByRole('films' as any);

    expect(result).toEqual([{ id: 1 }]);
    expect(mockAxios.get).toHaveBeenCalled();
  })

  it('should throw forbidden when role invalid', async () => {
    await expect(service.getByRole('fake' as any))
      .rejects
      .toThrow(ForbiddenException);
  });
});
