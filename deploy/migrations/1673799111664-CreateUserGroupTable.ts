import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserGroupTable1673799111664 implements MigrationInterface {
  name = 'CreateUserGroupTable1673799111664';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_group" ("groupId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_d9a1801971c4c66927d77560e73" PRIMARY KEY ("groupId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31e541c93fdc0bb63cfde6549b" ON "user_group" ("groupId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d6b372788ab01be58853003c9" ON "user_group" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_group" ADD CONSTRAINT "FK_31e541c93fdc0bb63cfde6549b7" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_group" ADD CONSTRAINT "FK_3d6b372788ab01be58853003c93" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_group" DROP CONSTRAINT "FK_3d6b372788ab01be58853003c93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_group" DROP CONSTRAINT "FK_31e541c93fdc0bb63cfde6549b7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d6b372788ab01be58853003c9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_31e541c93fdc0bb63cfde6549b"`,
    );
    await queryRunner.query(`DROP TABLE "user_group"`);
  }
}
