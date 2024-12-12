const elasticsearch = require('elasticsearch');

client = elasticsearch.Client({
    host: process.env.ES_HOST,
});

module.exports = client;