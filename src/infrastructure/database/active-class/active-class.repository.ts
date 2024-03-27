import { type EntityTarget } from 'typeorm';
import { ActiveClassEntity } from './active-class.entity';
import { BaseRepository } from '../provider/base.repository';
import { InjectInitializeDatabaseOnAllProps } from '../provider/inject-db';

@InjectInitializeDatabaseOnAllProps
export class ActiveClassRepository extends BaseRepository<ActiveClassEntity> {
  static repository = new ActiveClassRepository();
  static getRepository(): ActiveClassRepository {
    return ActiveClassRepository.repository;
  }
  constructor(target: EntityTarget<ActiveClassEntity> = ActiveClassEntity) {
    super(target);
  }
}
