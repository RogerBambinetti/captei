require('@dotenvx/dotenvx').config();

const database = require('./db/database');

database('snapshot').select('*').then(console.log);
