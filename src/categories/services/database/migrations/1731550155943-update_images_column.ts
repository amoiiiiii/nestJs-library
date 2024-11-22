import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateImagesColumn1731550155943 implements MigrationInterface {
    name = 'UpdateImagesColumn1731550155943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "image" TO "images"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "images" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "images" character varying`);
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "images" TO "image"`);
    }

}
