import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyClientAndCreateWorkSpace1665644070430 implements MigrationInterface {
    name = 'ModifyClientAndCreateWorkSpace1665644070430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workspace" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "image" character varying(200) NOT NULL, "member" jsonb NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_ca86b6f9b3be5fe26d307d09b49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5650371cc7972c69b945cef8e8" ON "workspace" ("user_id") WHERE deleted_at IS NULL`);
        await queryRunner.query(`ALTER TABLE "workspace" ADD CONSTRAINT "FK_a09cff0ab849da007d391eb9284" FOREIGN KEY ("user_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspace" DROP CONSTRAINT "FK_a09cff0ab849da007d391eb9284"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5650371cc7972c69b945cef8e8"`);
        await queryRunner.query(`DROP TABLE "workspace"`);
    }

}
