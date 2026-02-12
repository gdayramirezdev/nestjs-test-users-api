import { Injectable, CanActivate, ExecutionContext, BadRequestException, ForbiddenException } from '@nestjs/common';
import { allowedRoles, Role } from 'src/users/user.entity';

/**
 * RoleGuard compare role from user to the param in Request
 * If role is the same this user could call the ghibli API Request category
 */
@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const user = request.user as { role: Role };
    const category = request.params.category as Role;

    if (!user){
      throw new ForbiddenException('No user found');
    } 

    if (!allowedRoles.includes(category)) {
      throw new BadRequestException('Invalid category');
    }

    if (user.role !== Role.ADMIN && user.role !== category) {
      throw new ForbiddenException('Insufficient role');
    }

    return true;
  }
}
