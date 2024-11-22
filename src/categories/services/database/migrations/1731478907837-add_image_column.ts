import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageColumn1731478907837 implements MigrationInterface {
    name = 'AddImageColumn1731478907837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "image"`);
    }

}
