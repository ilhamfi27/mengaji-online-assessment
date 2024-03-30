import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnToClass1711778587662 implements MigrationInterface {
  name = 'AddColumnToClass1711778587662';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "classes" ADD "duration" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD "dateAndTime" TIMESTAMP WITH TIME ZONE NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "classes" ADD "teacherId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "classes" ADD CONSTRAINT "FK_4b7ac7a7eb91f3e04229c7c0b6f" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "classes" DROP CONSTRAINT "FK_4b7ac7a7eb91f3e04229c7c0b6f"`
    );
    await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "teacherId"`);
    await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "dateAndTime"`);
    await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "duration"`);
  }
}
