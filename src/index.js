require('@dotenvx/dotenvx').config();

const database = require('./db/database');

database('portal').select('*').then(console.log);
