/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    knex.schema.createTable("snapshot", (table) => {
        table.increments("id").primary();
        table.string("idPortal").notNullable();
        table.string("filters").notNullable();
        table.string("status").notNullable();
        table.dateTime("lastStarted").notNullable();
        table.dateTime("lastTerminated").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTable("snapshot");
};
