const BaseCrawler = require('./BaseCrawler');

class DudaImoveisCrawler extends BaseCrawler {
    constructor(url, filters) {

        const newUrl = new URL(url);

        console.log(newUrl.href)

        super(newUrl);
    }

    async handleCrawling(page) {
        const results = await page.$$('.imovel-box-single');

        await page.screenshot({ path: 'dudaimoveis.png' });
        console.log(results)
    }
}

module.exports = DudaImoveisCrawler;