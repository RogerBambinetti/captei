const BaseCrawler = require('./BaseCrawler');

class DudaImoveisCrawler extends BaseCrawler {
    constructor(url) {
        super(url);
    }

    async handleCrawling(page) {
        const results = await page.$$('.imovel-box-single');

        console.log(results)
    }
}

module.exports = DudaImoveisCrawler;