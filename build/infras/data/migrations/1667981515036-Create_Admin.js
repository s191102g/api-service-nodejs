"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdmin1667981515036 = void 0;
class CreateAdmin1667981515036 {
    constructor() {
        this.name = 'CreateAdmin1667981515036';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "role" character varying(10) NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(50), "avatar" character varying(200), "gender" character varying(6), "birth_day" TIMESTAMP WITH TIME ZONE, "username" character varying(50), "password" character varying(50) NOT NULL, CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id")) INHERITS ("user")`);
        await queryRunner.query(`CREATE INDEX "IDX_1b1a1d4bfda020e24e54b1da7e" ON "admin" ("role") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f70ad2c1b9e1d548bef9ba79da" ON "admin" ("username") WHERE deleted_at IS NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_f70ad2c1b9e1d548bef9ba79da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1b1a1d4bfda020e24e54b1da7e"`);
        await queryRunner.query(`DROP TABLE "admin"`);
    }
}
exports.CreateAdmin1667981515036 = CreateAdmin1667981515036;
