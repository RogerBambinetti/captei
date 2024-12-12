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

    async updateStatus(id, status) {
        try {
            await this.database('snapshot').where('id', id).update('status', status);

            const currentDatetime = new Date().toISOString();

            if (['erro', 'concluido'].includes(status)) {
                await this.database('snapshot').where('id', id).update('lastTerminated', currentDatetime);
            } else {
                await this.database('snapshot').where('id', id).update('lastStarted', currentDatetime);
            }

            console.log('Status updated:', status);
        } catch (error) {

            throw error;
        }
    }
}

module.exports = SnapshotController;