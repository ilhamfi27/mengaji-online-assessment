import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTeacherTable1711467130128 implements MigrationInterface {
  name = 'CreateTeacherTable1711467130128';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`teachers\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`teachers\``);
  }
}
