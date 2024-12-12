const BaseCrawler = require('./BaseCrawler');

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

        const resultLinks = await page.evaluate("Array.from( document.querySelectorAll('.imovel-box-single a.swiper-wrapper'), a => a.getAttribute('href'))");

        const data = [];

        for (const resultLink of resultLinks) {

            await this.navigateToPage(page, resultLink);

            const title = await page.evaluate("document.querySelector('#clb-imovel-topo h1').innerText");
            const description = await page.evaluate("document.querySelector('.property-amenities-imovel-detalhe').nextElementSibling.innerText");
            const address = await page.evaluate("document.querySelector('.endereco').innerText");
            const businessType = await page.evaluate("document.querySelector('.thumb-status').innerText");
            const price = await page.evaluate("document.querySelector('.thumb-price').innerText");

            const bedrooms = await page.evaluate("document.querySelector('#amenity-dormitorios').querySelector('span').innerText");
            const bathrooms = await page.evaluate("document.querySelector('#amenity-banheiros').querySelector('span').innerText");
            const parkingSpots = await page.evaluate("document.querySelector('#amenity-vagas').querySelector('span').innerText");
            const privateArea = await page.evaluate("document.querySelector('#amenity-area-privativa').querySelector('span').innerText");

            const propertyData = {
                url: resultLink,
                title,
                description,
                address,
                businessType,
                price,
                bedrooms,
                bathrooms,
                parkingSpots,
                privateArea
            };

            data.push(propertyData);

            console.log(`Added data ${data.length} of ${resultLinks.length}`, propertyData);
        }

        return data
    }
}

module.exports = DudaImoveisCrawler;