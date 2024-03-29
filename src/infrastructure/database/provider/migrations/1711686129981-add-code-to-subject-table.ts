import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCodeToSubjectTable1711686129981 implements MigrationInterface {
  name = 'AddCodeToSubjectTable1711686129981';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subjects" ADD "code" character varying(255) NOT NULL DEFAULT ''`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "code"`);
  }
}
