import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy tests', () => {
  let strategy: JwtStrategy;

  beforeEach(() => {
    strategy = new JwtStrategy({
      get: jest.fn().mockReturnValue('secret'),
    } as any)
  });

  it('should validate payload', async () => {
    const result = await strategy.validate({
      sub: '1',
      role: 'admin',
    });

    expect(result).toEqual({
      userId: '1',
      role: 'admin',
    });
  });
});
