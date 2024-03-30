import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveClassAssignment1711778183991 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "class_assignments"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "class_assignments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dateAndTime" TIMESTAMP WITH TIME ZONE NOT NULL, "duration" integer NOT NULL, "activeClassId" uuid, "teacherId" uuid, CONSTRAINT "PK_e38010125b650cab46f72058e60" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "class_assignments" ADD CONSTRAINT "FK_eabd34268f77282a71d673515b1" FOREIGN KEY ("activeClassId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "class_assignments" ADD CONSTRAINT "FK_933c28789989d3760cf7f82e9ee" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
