/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return knex("snapshot").insert({ id: 1, name: 'Duda Imóveis', url: 'https://dudaimoveis.com.br', observations: 'Portal da imobiliária Duda Imóveis' });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return knex("snapshot").delete()
};
