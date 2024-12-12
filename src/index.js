require('@dotenvx/dotenvx').config();
const removeAccents = require('remove-accents');

const database = require('./db/database');
const elasticsearch = require('./es/elasticsearch');

const PortalController = require('./controllers/PortalController');
const SnapshotController = require('./controllers/SnapshotController');
const ESController = require('./controllers/ESController');

const portalController = new PortalController(database);
const snapshotController = new SnapshotController(database);
const esController = new ESController(elasticsearch);

async function init() {
    const portals = await portalController.getAll();

    for (const portal of portals) {

        const snapshot = await snapshotController.getByPortal(portal.id);

        try {
            console.log(`Starting crawler for ${portal.name}...`);

            const crawlerName = removeAccents(portal.name).replace(/[^A-Z0-9]/ig, "");
            const Crawler = require(`./crawlers/${crawlerName}Crawler`);

            const crawler = new Crawler(portal.url, snapshot.filters);

            await snapshotController.updateStatus(snapshot.id, 'rodando');
            const data = await crawler.getData();
            await snapshotController.updateStatus(snapshot.id, 'concluido');

            await esController.bulkIndexData('imoveis', data);
        } catch (err) {
            snapshotController.updateStatus(snapshot.id, 'erro');
            console.log(`Error while crawling ${portal.name}: ${err.message}`);
        }

        console.log(`Crawler for ${portal.name} finished.`);
    }

    process.exit();
}

init();