import { MigrationInterface, QueryRunner } from "typeorm";

export class FixClassAssignmentTable1711630754548 implements MigrationInterface {
    name = 'FixClassAssignmentTable1711630754548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class_assignment_entity" DROP COLUMN "dateAndTime"`);
        await queryRunner.query(`ALTER TABLE "class_assignment_entity" ADD "dateAndTime" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class_assignment_entity" DROP COLUMN "dateAndTime"`);
        await queryRunner.query(`ALTER TABLE "class_assignment_entity" ADD "dateAndTime" TIMESTAMP NOT NULL`);
    }

}
