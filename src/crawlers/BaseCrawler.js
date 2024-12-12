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

    async findButtonByText(page, buttonText) {
        const buttons = await page.$$('button');

        for (const btn of buttons) {
            const btnText = await btn.evaluate(x => x.textContent);

            if (btnText && btnText.trim() == buttonText) {
                return btn;
            }
        }
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