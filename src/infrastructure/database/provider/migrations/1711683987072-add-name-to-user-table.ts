import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNameToUserTable1711683987072 implements MigrationInterface {
  name = 'AddNameToUserTable1711683987072';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "name" character varying(255) NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
  }
}
