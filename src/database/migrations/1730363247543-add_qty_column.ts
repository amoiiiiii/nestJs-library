import { MigrationInterface, QueryRunner } from "typeorm";

export class AddQtyColumn1730363247543 implements MigrationInterface {
    name = 'AddQtyColumn1730363247543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "qty" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "qty"`);
    }

}
