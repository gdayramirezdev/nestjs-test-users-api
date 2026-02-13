import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/users/user.entity';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let configService: ConfigService;

  beforeEach(() => {
    process.env.JWT_SECRET = 'test_secret';

    configService = {
      get: jest.fn(),
    } as any;

    jwtStrategy = new JwtStrategy(configService);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  it('should validate and return user object', async () => {
    const payload = { sub: 1, role: Role.ADMIN };

    const result = await jwtStrategy.validate(payload);

    expect(result).toEqual({ userId: 1, role: Role.ADMIN });
  });
});
