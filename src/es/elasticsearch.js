const { Client } = require('@elastic/elasticsearch')

const client = new Client({
    node: process.env.ES_HOST,
    auth: {
        username: process.env.ES_USER,
        password: process.env.ES_PASSWORD
    },
    tls: {
        rejectUnauthorized: false,
    }
})

module.exports = client;