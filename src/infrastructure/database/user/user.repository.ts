import { type EntityTarget } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseRepository } from '../provider/base.repository';
import { InjectInitializeDatabaseOnAllProps } from '../provider/inject-db';

@InjectInitializeDatabaseOnAllProps
export class UserRepository extends BaseRepository<UserEntity> {
  static repository = new UserRepository();
  static getRepository(): UserRepository {
    return UserRepository.repository;
  }
  constructor(target: EntityTarget<UserEntity> = UserEntity) {
    super(target);
  }
}
