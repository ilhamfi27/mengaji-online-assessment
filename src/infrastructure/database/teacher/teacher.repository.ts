import { type EntityTarget } from "typeorm";
import { TeacherEntity } from "./teacher.entity";
import { BaseRepository } from "../provider/base.repository";
import { InjectInitializeDatabaseOnAllProps } from "../provider/inject-db";

@InjectInitializeDatabaseOnAllProps
export class TeacherRepository extends BaseRepository<TeacherEntity> {
  static repository = new TeacherRepository();
  static getRepository(): TeacherRepository {
      return TeacherRepository.repository;
  }
  constructor(target: EntityTarget<TeacherEntity> = TeacherEntity) {
      super(target);
  }
}