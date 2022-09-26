import { MigrationInterface, QueryRunner } from "typeorm"

export class test1664166991966 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE "test" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE,  "name" character varying(50) COLLATE pg_catalog."default" NOT NULL , CONSTRAINT "test_pkey" PRIMARY KEY ("id"))'
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "test"');
    }

}
