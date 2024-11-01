import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBooksTable1730362994074 implements MigrationInterface {
    name = 'AddBooksTable1730362994074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "qty"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "qty" integer NOT NULL DEFAULT '0'`);
    }

}
