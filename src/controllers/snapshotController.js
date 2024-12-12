class SnapshotController {
    constructor(db) {
        this.database = db;
    }

    async getAll() {
        try {
            const snapshots = await this.database('snapshot').select('*');

            return snapshots;
        } catch (error) {

            throw error;
        }
    }
}

module.exports = SnapshotController;