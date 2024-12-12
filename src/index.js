require('@dotenvx/dotenvx').config();
const removeAccents = require('remove-accents');

const PortalController = require('./controllers/PortalController');

const database = require('./db/database');

const portalController = new PortalController(database);

async function init() {
    const portals = await portalController.getAll();

    for (const portal of portals) {
        try {
            console.log(`Starting crawler for ${portal.name}...`);

            const crawlerName = removeAccents(portal.name).replace(/[^A-Z0-9]/ig, "");
            const crawler = require(`./crawlers/${crawlerName}Crawler`);
        } catch (err) {
            console.log(`Error while crawling ${portal.name}: ${err.message}`);
        }

    }
}

init()