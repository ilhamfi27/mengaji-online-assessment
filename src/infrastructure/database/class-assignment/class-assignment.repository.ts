import { type EntityTarget } from "typeorm";
import { ClassAssignmentEntity } from "./class-assignment.entity";
import { BaseRepository } from "../provider/base.repository";
import { InjectInitializeDatabaseOnAllProps } from "../provider/inject-db";

@InjectInitializeDatabaseOnAllProps
export class ClassAssignmentRepository extends BaseRepository<ClassAssignmentEntity> {
  static repository = new ClassAssignmentRepository();
  static getRepository(): ClassAssignmentRepository {
      return ClassAssignmentRepository.repository;
  }
  constructor(target: EntityTarget<ClassAssignmentEntity> = ClassAssignmentEntity) {
      super(target);
  }
}