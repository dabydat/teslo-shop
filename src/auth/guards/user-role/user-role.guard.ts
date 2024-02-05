import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler())
    if (!validRoles) return true;
    if (validRoles.length === 0) return true;
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) throw new InternalServerErrorException("User not found");
    console.log({ userRoles: user.roles });

    for (const roles of user.roles) {
      if (validRoles.includes(roles)) {
        return true;
      }
    }

    throw new ForbiddenException(`User ${user.fullName} need a valid role: [${validRoles}]`);
  }
}
