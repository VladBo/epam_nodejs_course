import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGroups1673732862829 implements MigrationInterface {
  name = 'CreateGroups1673732862829';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."group_permissions_enum" AS ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')`,
    );
    await queryRunner.query(
      `CREATE TABLE "group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "permissions" "public"."group_permissions_enum" array NOT NULL DEFAULT '{}', CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "group"`);
    await queryRunner.query(`DROP TYPE "public"."group_permissions_enum"`);
  }
}
