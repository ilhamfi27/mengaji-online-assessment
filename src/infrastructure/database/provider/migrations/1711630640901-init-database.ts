import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1711630640901 implements MigrationInterface {
  name = 'InitDatabase1711630640901';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "teachers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "employeeId" character varying(255) NOT NULL, "gender" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "subjects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "classes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "title" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`
    );
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "class_assignment_entity" DROP CONSTRAINT "FK_c2f06fb0f04926b459fa9fd16d8"`
    );
    await queryRunner.query(
      `ALTER TABLE "class_assignment_entity" DROP CONSTRAINT "FK_c33bb6c4be27262ca0f5f3073d6"`
    );
    await queryRunner.query(
      `ALTER TABLE "class_assignment_entity" DROP CONSTRAINT "FK_1cb580bd1b4300ef98bbaf29b0d"`
    );
    await queryRunner.query(`DROP TABLE "class_assignment_entity"`);
    await queryRunner.query(`DROP TABLE "classes"`);
    await queryRunner.query(`DROP TABLE "subjects"`);
    await queryRunner.query(`DROP TABLE "teachers"`);
  }
}
