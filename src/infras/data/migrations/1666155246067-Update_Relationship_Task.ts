import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationshipTask1666155246067 implements MigrationInterface {
    name = 'UpdateRelationshipTask1666155246067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_b5bd7850f0e80fdf5bfa59e5331" FOREIGN KEY ("data-id") REFERENCES "data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_b5bd7850f0e80fdf5bfa59e5331"`);
    }

}
