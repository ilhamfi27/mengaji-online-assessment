import { NotFoundException, UnauthorizedException } from 'next-api-decorators';
import { LoginRequest } from '../pages/api/users/request';
import { UserRepository } from '../infrastructure/database/user/user.repository';
import { hashString } from '../utils/hash';
import { encode, validate } from '../utils/jwt';
import { UserEntity } from '../infrastructure/database/user/user.entity';

export class UserService {
  public static readonly service: UserService = new UserService();
  static getService(): UserService {
    return UserService.service;
  }

  async login(loginRequest: LoginRequest) {
    const user = await UserRepository.getRepository().findOne({
      where: { email: loginRequest.email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password !== hashString(loginRequest.password)) {
      throw new UnauthorizedException('Incorrect Credentials');
    }
    return {
      token: encode({ id: user.id, email: user.email, role: user.role }),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async me(token: string) {
    const userData = validate(token) as UserEntity;
    const user = await UserRepository.getRepository().findOne({
      where: { id: userData.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return user;
  }
}
