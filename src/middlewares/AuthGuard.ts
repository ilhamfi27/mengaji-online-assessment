import { NextApiRequest, NextApiResponse } from 'next';
import {
  NextFunction,
  UnauthorizedException,
  createMiddlewareDecorator,
} from 'next-api-decorators';
import { validate } from '../utils/jwt';
import { UserEntity } from '../infrastructure/database/user/user.entity';
import { UserService } from '../domains/user.service';

export const SessionGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const session = req.cookies['mengaji-online-session'];
    if (!session || !validate(session as string)) {
      throw new UnauthorizedException();
    }

    const user = await UserService.getService().me(session as string);
    if (!req.session) {
      req.session = {} as any;
    }
    if (user) {
      req.session.user = user as UserEntity;
    }
    return next();
  }
);
