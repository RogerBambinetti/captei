class PortalController {
    constructor(db) {
        this.database = db;
    }

    async getAll() {
        try {
            const portals = await this.database('portal').select('*');

            return portals;
        } catch (error) {

            throw error;
        }
    }
}

module.exports = PortalController;