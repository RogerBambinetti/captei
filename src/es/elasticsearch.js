const { Client } = require('@elastic/elasticsearch')

const client = new Client({
    node: process.env.ES_HOST,
    tls: {
        rejectUnauthorized: false,
    }
})

module.exports = client;