"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCLientAndUser1665556259838 = void 0;
class CreateCLientAndUser1665556259838 {
    constructor() {
        this.name = 'CreateCLientAndUser1665556259838';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "role" character varying(10) NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(50), "avatar" character varying(200), "gender" character varying(6), "birth_day" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6620cd026ee2b231beac7cfe57" ON "user" ("role") `);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "role" character varying(10) NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(50), "avatar" character varying(200), "gender" character varying(6), "birth_day" TIMESTAMP WITH TIME ZONE, "username" character varying(50) NOT NULL, "password" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id")) INHERITS ("user")`);
        await queryRunner.query(`CREATE INDEX "IDX_e0a97c465bee2c04c47a6f8239" ON "client" ("role") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_060ce53e22948b78141e384349" ON "client" ("username") WHERE deleted_at IS NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_060ce53e22948b78141e384349"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e0a97c465bee2c04c47a6f8239"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6620cd026ee2b231beac7cfe57"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
exports.CreateCLientAndUser1665556259838 = CreateCLientAndUser1665556259838;
