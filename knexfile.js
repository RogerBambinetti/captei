require('@dotenvx/dotenvx').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_CONNECTION_STRING,
    migrations: {
      directory: "./src/db/migrations",
    }
  }
};