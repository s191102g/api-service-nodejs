// import { randomUUID } from "crypto";
import { MigrationInterface, QueryRunner } from "typeorm";
// import { Admin } from "../../../core/domain/entities/user/Admin";
// import { RoleType } from "../../../core/domain/enums/user/userEnum";
// import { IAdminRepository } from "../../../core/gateways/repositories/user/IAdminRepository";
// import { AdminRepository } from "../repositories/user/AdminRepository";

// async function initData(queryRunner: QueryRunner): Promise<void> {
//     const adminRepository: IAdminRepository = new AdminRepository();
//     // Create user "Super Admin"
  
//     const admin = new Admin();
//     admin.id = randomUUID();
//     admin.role = RoleType.Admin;
//     admin.firstName = "Super";
//     admin.lastName = "Admin";
//     admin.userName = "admin@localhost.com";
//     admin.passWord = "dols1911"

  
//     await adminRepository.create(admin, queryRunner);

  
   
//   }
  

export class CreateAdmin1667981515036 implements MigrationInterface {
    name = 'CreateAdmin1667981515036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "role" character varying(10) NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(50), "avatar" character varying(200), "gender" character varying(6), "birth_day" TIMESTAMP WITH TIME ZONE, "username" character varying(50), "password" character varying(50) NOT NULL, CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id")) INHERITS ("user")`);
        await queryRunner.query(`CREATE INDEX "IDX_1b1a1d4bfda020e24e54b1da7e" ON "admin" ("role") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f70ad2c1b9e1d548bef9ba79da" ON "admin" ("username") WHERE deleted_at IS NULL`);
        // await initData(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f70ad2c1b9e1d548bef9ba79da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1b1a1d4bfda020e24e54b1da7e"`);
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
