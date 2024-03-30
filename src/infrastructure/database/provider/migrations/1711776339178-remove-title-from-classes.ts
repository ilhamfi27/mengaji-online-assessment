import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveTitleFromClasses1711776339178 implements MigrationInterface {
  name = 'RemoveTitleFromClasses1711776339178';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "title"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "classes" ADD "title" character varying(255) NOT NULL`
    );
  }
}
