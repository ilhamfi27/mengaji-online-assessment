import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameTable1711777296106 implements MigrationInterface {
  name = 'RenameTable1711777296106';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "class_assignments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dateAndTime" TIMESTAMP WITH TIME ZONE NOT NULL, "duration" integer NOT NULL, "activeClassId" uuid, "teacherId" uuid, CONSTRAINT "PK_e38010125b650cab46f72058e60" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "class_assignments" ADD CONSTRAINT "FK_eabd34268f77282a71d673515b1" FOREIGN KEY ("activeClassId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "class_assignments" ADD CONSTRAINT "FK_933c28789989d3760cf7f82e9ee" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`DROP TABLE "class_assignment_entity"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "class_assignment_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dateAndTime" TIMESTAMP NOT NULL, "duration" integer NOT NULL, "activeClassId" uuid, "teacherId" uuid, "subjectId" uuid, CONSTRAINT "PK_81167f3a81b09413d8d4c8eeab0" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "class_assignment_entity" ADD CONSTRAINT "FK_1cb580bd1b4300ef98bbaf29b0d" FOREIGN KEY ("activeClassId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "class_assignment_entity" ADD CONSTRAINT "FK_c33bb6c4be27262ca0f5f3073d6" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "class_assignment_entity" ADD CONSTRAINT "FK_c2f06fb0f04926b459fa9fd16d8" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "class_assignments" DROP CONSTRAINT "FK_933c28789989d3760cf7f82e9ee"`
    );
    await queryRunner.query(
      `ALTER TABLE "class_assignments" DROP CONSTRAINT "FK_eabd34268f77282a71d673515b1"`
    );
    await queryRunner.query(`DROP TABLE "class_assignments"`);
  }
}
