const elasticsearch = require('elasticsearch');

esClient = elasticsearch.Client({
    host: process.env.ES_HOST,
});

module.exports = esClient;