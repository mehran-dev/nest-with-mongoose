import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/models/models';

interface JWTPayload {
  name: string;
  id: number;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (roles?.length) {
      const request = context.switchToHttp().getRequest();
      const token = request.headers?.authorization?.split('Bearer ')[1];
      try {
        const payload = (await jwt.verify(
          token,
          process.env.JSON_TOKEN_KEY,
        )) as JWTPayload;

        const user = await User.findOne({
          _id: payload.id,
        });

        console.log('====================================');
        console.log(user);
        console.log('====================================');
        if (!user) return false;
        if (roles.includes(user.user_type)) return true;

        return false;
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        return false;
      }
    }

    return true;
  }
}
