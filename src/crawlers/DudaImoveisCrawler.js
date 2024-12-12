const BaseCrawler = require('./BaseCrawler');

class DudaImoveisCrawler extends BaseCrawler {
    constructor(url) {
        super(url);
    }

    async handleCrawling(page) {
        console.log(page.url());
    }
}

module.exports = DudaImoveisCrawler;