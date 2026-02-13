import { ExecutionContext, ForbiddenException, BadRequestException } from '@nestjs/common';
import { RoleGuard } from './roles.guard';
import { Role, allowedRoles } from 'src/users/user.entity';

describe('RoleGuard tests', () => {
  let guard: RoleGuard;

  const mockExecutionContext = (user: any, category: any): ExecutionContext =>
  ({
    switchToHttp: () => ({
      getRequest: () => ({
        user,
        params: { category },
      }),
    }),
  } as unknown as ExecutionContext);

  beforeEach(() => {
    guard = new RoleGuard();
  });

  it('should allow access when user is ADMIN', () => {
    const context = mockExecutionContext(
      { role: Role.ADMIN },
      allowedRoles[0],
    );

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should allow access when role matches with a valid category', () => {
    const role = allowedRoles[0];
    const context = mockExecutionContext({ role }, role);

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should throw ForbiddenException if is not user', () => {
    const context = mockExecutionContext(null, allowedRoles[0]);

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('should throw BadRequestException if category is invalid', () => {
    const context = mockExecutionContext(
      { role: Role.ADMIN },
      'INVALID_ROLE',
    );

    expect(() => guard.canActivate(context)).toThrow(BadRequestException);
  });

  it('should throw ForbiddenException if role is insufficient', () => {
    const context = mockExecutionContext(
      { role: allowedRoles[0] },
      allowedRoles[1],
    );

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });
});
