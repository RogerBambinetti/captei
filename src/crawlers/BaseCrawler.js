const puppeteer = require('puppeteer');

class BaseCrawler {

    constructor(url) {
        this.baseUrl = url;
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

    async crawl() {
        const browser = await this.launchBrowser();
        const page = await browser.newPage();

        try {
            await this.navigateToPage(page, this.baseUrl);

            const songs = [];

            return songs;
        } catch (e) {
            console.log('An error occurred during data retrieval:', e);
        } finally {
            await browser.close();
        }
    }

    async getData() {
        const data = await this.crawl();

        return data;
    }
}

module.exports = BaseCrawler;