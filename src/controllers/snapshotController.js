class SnapshotController {
    constructor(db) {
        this.database = db;
    }

    async getByPortal(idPortal) {
        try {
            const snapshot = await this.database('snapshot').select('*').where('idPortal', idPortal);

            return snapshot[0];
        } catch (error) {

            throw error;
        }
    }
}

module.exports = SnapshotController;