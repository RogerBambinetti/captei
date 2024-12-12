/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return knex.schema.createTable("portal", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("url").notNullable();
        table.string("observations").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return knex.schema.dropTable("portal");
};
