const crypto = require('node:crypto');
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

        if (filters.bedrooms) {
            path.push(filters.bedrooms + '-dormitorios');
        }

        if (filters.bathrooms) {
            path.push(filters.bathrooms + '-banheiros');
        }

        if (filters.parkingSpots) {
            path.push(filters.parkingSpots + '-vagas');
        }

        const newUrl = new URL(path.join('/'), this.baseUrl);

        await this.navigateToPage(page, newUrl.toString());
    }

    async handleCrawling(page) {

        console.log('Crawling...');

        const resultLinks = [];

        let currentPage = 1;
        const currentPageSelector = `#page${currentPage}`;

        const itemsPerPage = 12;

        do {
            await page.waitForSelector(currentPageSelector);
            const pageLinks = await page.evaluate(`Array.from( document.querySelectorAll('${currentPageSelector} .imovel-box-single a.swiper-wrapper'), a => a.getAttribute('href'))`);

            const scrollHeight = await page.evaluate("document.querySelector('.clb-search-result-property').scrollHeight");
            await page.evaluate(`document.querySelector('.clb-search-result-property').scrollTo(0, window.scrollY + ${scrollHeight})`);

            resultLinks.push(...pageLinks);

            // Break if there are no more items to load
            if (pageLinks.length < itemsPerPage) {
                break;
            }

            currentPage++;
        } while (resultLinks.length < process.env.CRAWLER_COUNT_LIMIT);

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

            const currentDatetime = new Date().toISOString();

            const propertyData = {
                id: crypto.randomUUID(),
                titulo: title,
                descricao: description,
                url: resultLink,
                tipoNegocio: businessType,
                endereco: address,
                preco: price,
                quartos: bedrooms,
                banheiros: bathrooms,
                vagas_garagem: parkingSpots,
                area_util: privateArea,
                capturado_em: currentDatetime,
                atualizado_em: currentDatetime
            };

            data.push(propertyData);
            console.log(`Added data ${data.length} of ${resultLinks.length}`, propertyData);
        }

        return data;
    }
}

module.exports = DudaImoveisCrawler;