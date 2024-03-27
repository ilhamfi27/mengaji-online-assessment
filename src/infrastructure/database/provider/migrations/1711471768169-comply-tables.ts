import { MigrationInterface, QueryRunner } from 'typeorm';

export class ComplyTables1711471768169 implements MigrationInterface {
  name = 'ComplyTables1711471768169';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`subjects\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`classes\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`class_assignment_entity\` (\`id\` varchar(36) NOT NULL, \`dateAndTime\` datetime NOT NULL, \`duration\` int NOT NULL, \`activeClassId\` varchar(36) NULL, \`teacherId\` varchar(36) NULL, \`subjectId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`teachers\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`
    );
    await queryRunner.query(
      `ALTER TABLE \`teachers\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`
    );
    await queryRunner.query(
      `ALTER TABLE \`teachers\` ADD \`deletedAt\` timestamp(6) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`class_assignment_entity\` ADD CONSTRAINT \`FK_1cb580bd1b4300ef98bbaf29b0d\` FOREIGN KEY (\`activeClassId\`) REFERENCES \`classes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`class_assignment_entity\` ADD CONSTRAINT \`FK_c33bb6c4be27262ca0f5f3073d6\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teachers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`class_assignment_entity\` ADD CONSTRAINT \`FK_c2f06fb0f04926b459fa9fd16d8\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subjects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`class_assignment_entity\` DROP FOREIGN KEY \`FK_c2f06fb0f04926b459fa9fd16d8\``
    );
    await queryRunner.query(
      `ALTER TABLE \`class_assignment_entity\` DROP FOREIGN KEY \`FK_c33bb6c4be27262ca0f5f3073d6\``
    );
    await queryRunner.query(
      `ALTER TABLE \`class_assignment_entity\` DROP FOREIGN KEY \`FK_1cb580bd1b4300ef98bbaf29b0d\``
    );
    await queryRunner.query(
      `ALTER TABLE \`teachers\` DROP COLUMN \`deletedAt\``
    );
    await queryRunner.query(
      `ALTER TABLE \`teachers\` DROP COLUMN \`updatedAt\``
    );
    await queryRunner.query(
      `ALTER TABLE \`teachers\` DROP COLUMN \`createdAt\``
    );
    await queryRunner.query(`DROP TABLE \`class_assignment_entity\``);
    await queryRunner.query(`DROP TABLE \`classes\``);
    await queryRunner.query(`DROP TABLE \`subjects\``);
  }
}
