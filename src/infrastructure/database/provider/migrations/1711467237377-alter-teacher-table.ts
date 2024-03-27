import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTeacherTable1711467237377 implements MigrationInterface {
  name = 'AlterTeacherTable1711467237377';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`teachers\` ADD \`employeeId\` varchar(255) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`teachers\` ADD \`gender\` varchar(255) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`teachers\` DROP COLUMN \`gender\``);
    await queryRunner.query(
      `ALTER TABLE \`teachers\` DROP COLUMN \`employeeId\``
    );
  }
}
