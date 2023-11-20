import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id"  NOT NULL,
                "username" varchar(255) NOT NULL,
                "email" varchar(255) NOT NULL,
                "state" varchar(255) NOT NULL,
                "marks" int NOT NULL,
                CONSTRAINT "PK_KEY" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
