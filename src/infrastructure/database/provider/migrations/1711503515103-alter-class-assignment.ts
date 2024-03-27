import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterClassAssignment1711503515103 implements MigrationInterface {
    name = 'AlterClassAssignment1711503515103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teachers\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`subjects\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`classes\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` DROP FOREIGN KEY \`FK_1cb580bd1b4300ef98bbaf29b0d\``);
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` DROP FOREIGN KEY \`FK_c33bb6c4be27262ca0f5f3073d6\``);
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` DROP FOREIGN KEY \`FK_c2f06fb0f04926b459fa9fd16d8\``);
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` CHANGE \`activeClassId\` \`activeClassId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` CHANGE \`teacherId\` \`teacherId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` CHANGE \`subjectId\` \`subjectId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` ADD CONSTRAINT \`FK_1cb580bd1b4300ef98bbaf29b0d\` FOREIGN KEY (\`activeClassId\`) REFERENCES \`classes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` ADD CONSTRAINT \`FK_c33bb6c4be27262ca0f5f3073d6\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teachers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` ADD CONSTRAINT \`FK_c2f06fb0f04926b459fa9fd16d8\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subjects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` DROP FOREIGN KEY \`FK_c2f06fb0f04926b459fa9fd16d8\``);
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` DROP FOREIGN KEY \`FK_c33bb6c4be27262ca0f5f3073d6\``);
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` DROP FOREIGN KEY \`FK_1cb580bd1b4300ef98bbaf29b0d\``);
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` CHANGE \`subjectId\` \`subjectId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` CHANGE \`teacherId\` \`teacherId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` CHANGE \`activeClassId\` \`activeClassId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` ADD CONSTRAINT \`FK_c2f06fb0f04926b459fa9fd16d8\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subjects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` ADD CONSTRAINT \`FK_c33bb6c4be27262ca0f5f3073d6\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teachers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`class_assignment_entity\` ADD CONSTRAINT \`FK_1cb580bd1b4300ef98bbaf29b0d\` FOREIGN KEY (\`activeClassId\`) REFERENCES \`classes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`classes\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`subjects\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`teachers\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL DEFAULT 'NULL'`);
    }

}
