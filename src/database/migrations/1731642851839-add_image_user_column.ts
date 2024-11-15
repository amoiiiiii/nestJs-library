import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageUserColumn1731642851839 implements MigrationInterface {
    name = 'AddImageUserColumn1731642851839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image"`);
    }

}
