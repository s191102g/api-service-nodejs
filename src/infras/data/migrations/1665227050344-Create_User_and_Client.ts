import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAndClient1665227050344 implements MigrationInterface {
    name = 'CreateUserAndClient1665227050344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "role" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying, "avatar" character varying(200), "gender" character varying(6), "birth_day" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "role" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying, "avatar" character varying(200), "gender" character varying(6), "birth_day" character varying, "user_name" character varying NOT NULL, "pass_word" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
