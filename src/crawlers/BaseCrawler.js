const puppeteer = require('puppeteer');

class BaseCrawler {

    constructor(url, filters) {
        this.baseUrl = url;
        this.filters = filters;
    }

    async launchBrowser() {
        console.log('Launching browser...');
        return puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    }

    async navigateToPage(page, url) {
        console.log('Navigating to page...');
        await page.goto(url, { waitUntil: 'networkidle0' });
    }

    async getData() {
        const browser = await this.launchBrowser();
        const page = await browser.newPage();

        try {
            await this.navigateToPage(page, this.baseUrl);
            await this.handleFilter(page);

            const data = await this.handleCrawling(page);

            return data;
        } catch (e) {
            console.log('An error occurred during data retrieval:', e);
        } finally {
            await browser.close();
        }
    }
}

module.exports = BaseCrawler;