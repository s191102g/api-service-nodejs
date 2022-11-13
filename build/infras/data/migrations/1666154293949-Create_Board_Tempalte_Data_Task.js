"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBoardTempalteDataTask1666154293949 = void 0;
class CreateBoardTempalteDataTask1666154293949 {
    constructor() {
        this.name = 'CreateBoardTempalteDataTask1666154293949';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying(200) NOT NULL, "content" text NOT NULL, "position" integer NOT NULL, "data-id" uuid NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_36e1b9c231020a6bd064c5d124" ON "task" ("title") WHERE deleted_at IS NULL`);
        await queryRunner.query(`CREATE TABLE "data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "heading" character varying(200) NOT NULL, "board_id" uuid NOT NULL, CONSTRAINT "REL_0f6b9046ec4321abd99a6de879" UNIQUE ("board_id"), CONSTRAINT "PK_2533602bd9247937e3a4861e173" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "template" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "type_by_string" character varying(50) NOT NULL, "USAGE_FIELD" jsonb NOT NULL, CONSTRAINT "PK_fbae2ac36bd9b5e1e793b957b7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_cb76d338f50f600bd39959e2ca" ON "template" ("type_by_string") WHERE deleted_at IS NULL`);
        await queryRunner.query(`CREATE TYPE "public"."board_favourite_enum" AS ENUM('favourite', 'unfavourite')`);
        await queryRunner.query(`CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying(200) NOT NULL, "icon" character varying(200) NOT NULL, "position" integer NOT NULL, "description" text NOT NULL, "favourite" "public"."board_favourite_enum" NOT NULL DEFAULT 'unfavourite', "favourite_position" integer NOT NULL, "workspace_id" uuid NOT NULL, "template_id" uuid NOT NULL, CONSTRAINT "REL_262b64bba57c3fafd907d79a47" UNIQUE ("template_id"), CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f84b6556e851c5aa76be7b5304" ON "board" ("title") WHERE deleted_at IS NULL`);
        await queryRunner.query(`ALTER TABLE "data" ADD CONSTRAINT "FK_0f6b9046ec4321abd99a6de8796" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_31496d48054fe218ee366a3010a" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_262b64bba57c3fafd907d79a472" FOREIGN KEY ("template_id") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_262b64bba57c3fafd907d79a472"`);
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_31496d48054fe218ee366a3010a"`);
        await queryRunner.query(`ALTER TABLE "data" DROP CONSTRAINT "FK_0f6b9046ec4321abd99a6de8796"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f84b6556e851c5aa76be7b5304"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TYPE "public"."board_favourite_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb76d338f50f600bd39959e2ca"`);
        await queryRunner.query(`DROP TABLE "template"`);
        await queryRunner.query(`DROP TABLE "data"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_36e1b9c231020a6bd064c5d124"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }
}
exports.CreateBoardTempalteDataTask1666154293949 = CreateBoardTempalteDataTask1666154293949;
