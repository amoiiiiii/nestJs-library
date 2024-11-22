import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateImageColumn1731575855964 implements MigrationInterface {
    name = 'UpdateImageColumn1731575855964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "images" TO "image"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "image" text`);
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "image" TO "images"`);
    }

}
