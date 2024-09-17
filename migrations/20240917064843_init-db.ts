import { table } from "console";
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('imageUrl');
        table.increments('estimatedAge');
        table.timestamp('createdAt').defaultTo(knex.fn.now()).index();
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

