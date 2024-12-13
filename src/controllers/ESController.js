class ESController {
    constructor(es) {
        this.elasticsearch = es;
    }

    async bulkIndexData(index, dataArray) {
        try {

            const body = dataArray.flatMap(doc => [{ index: { _index: index } }, doc]);

            await this.elasticsearch.bulk({ body });

            console.log('Data indexed successfully at index:', index);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ESController;