import { type EntityTarget } from "typeorm";
import { SubjectEntity } from "./subject.entity";
import { BaseRepository } from "../provider/base.repository";
import { InjectInitializeDatabaseOnAllProps } from "../provider/inject-db";

@InjectInitializeDatabaseOnAllProps
export class SubjectRepository extends BaseRepository<SubjectEntity> {
  static repository = new SubjectRepository();
  static getRepository(): SubjectRepository {
      return SubjectRepository.repository;
  }
  constructor(target: EntityTarget<SubjectEntity> = SubjectEntity) {
      super(target);
  }
}