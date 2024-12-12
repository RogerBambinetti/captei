const BaseCrawler = require('./BaseCrawler');
const path = require('path');

class DudaImoveisCrawler extends BaseCrawler {
    constructor(url, filters) {
        super(url, filters);
    }

    async handleFilter(page) {

        console.log('Applyng filters...');

        const filters = this.filters;
        const path = [];

        path.push(filters.businessType || 'aluguel');
        path.push(filters.propertyType || 'apartamento');

        const newUrl = new URL(path.join('/'), this.baseUrl);

        await this.navigateToPage(page, newUrl.toString());
    }

    async handleCrawling(page) {

        console.log('Crawling...');

        const results = await page.$$('.imovel-box-single');

        console.log(results)
    }
}

module.exports = DudaImoveisCrawler;