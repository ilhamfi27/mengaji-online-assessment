import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeBehaviorOfOnDelete1711788074657
  implements MigrationInterface
{
  name = 'ChangeBehaviorOfOnDelete1711788074657';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "teachers" DROP CONSTRAINT "FK_2ad5ac38c8f3dbc4768179be5cc"`
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD CONSTRAINT "FK_2ad5ac38c8f3dbc4768179be5cc" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "teachers" DROP CONSTRAINT "FK_2ad5ac38c8f3dbc4768179be5cc"`
    );
    await queryRunner.query(
      `ALTER TABLE "teachers" ADD CONSTRAINT "FK_2ad5ac38c8f3dbc4768179be5cc" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
