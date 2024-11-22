import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBorrowTable1730769905245 implements MigrationInterface {
    name = 'AddBorrowTable1730769905245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "borrows" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "book_id" integer NOT NULL, "borrow_date" TIMESTAMP NOT NULL DEFAULT now(), "return_date" TIMESTAMP, CONSTRAINT "PK_69f3a91fbbed0a8a2ce30efbce1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "borrows" ADD CONSTRAINT "FK_c9b0c21ce0c14b78c266e304622" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "borrows" ADD CONSTRAINT "FK_4338f57a03c1b0cd47915d47664" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrows" DROP CONSTRAINT "FK_4338f57a03c1b0cd47915d47664"`);
        await queryRunner.query(`ALTER TABLE "borrows" DROP CONSTRAINT "FK_c9b0c21ce0c14b78c266e304622"`);
        await queryRunner.query(`DROP TABLE "borrows"`);
    }

}
