require('@dotenvx/dotenvx').config();
const PortalController = require('./controllers/PortalController');

const database = require('./db/database');

const portalController = new PortalController(database);

const portals = portalController.getAll().then((portals) => { console.log(portals) });
