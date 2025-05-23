const puppeteer = require('puppeteer');
const { listUrl } = require('../config');
const { comicListConfig } = require("../configs/komiku.id") 

async function scrapeComicList() {
	const browser = await puppeteer.launch({ headless: 'new' });
	const page = await browser.newPage();

	await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
	await page.goto(comicListConfig.url, { waitUntil: comicListConfig.waitUntil, timeout: comicListConfig.timeout });

	const comics = await page.evaluate((baseUrl, config) => {
		const list = [];
		const articles = document.querySelectorAll(config.listComicsSelector);
		articles.forEach(article => {
			const titleEl = article.querySelector(config.titleSelector);
			const linkEl = article.querySelector(config.linkSelector);
			const cover = article.querySelector(config.coverSelector)?.getAttribute('src') || null;

			if (titleEl && linkEl) {
				const title = titleEl.innerText.trim();
				const href = linkEl.getAttribute('href');
				list.push({
					title,
					url: baseUrl + href,
					cover
				});
			}
		});
		return list;
	}, listUrl, comicListConfig);


	await browser.close();
	return comics;
}

module.exports = scrapeComicList;
