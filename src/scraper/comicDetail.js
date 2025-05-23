const puppeteer = require('puppeteer');
const {comicDetailConfig} = require("../configs/komiku.id")

async function scrapeComicDetail(url) {
	const browser = await puppeteer.launch({ headless: 'new' });
	const page = await browser.newPage();

	await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
	await page.goto(url, {
		waitUntil: 'networkidle2',
		timeout: 30000
	});

	// Tunggu elemen penting muncul
	await page.waitForSelector(comicDetailConfig.titleSelector, { timeout: 10000 });

	const data = await page.evaluate((config) => {
		const title = document.querySelector(config.titleSelector)?.innerText.trim() || '';
		const description = document.querySelector(config.descSelector)?.innerText.trim() || '';

		const chapterNodes = document.querySelectorAll(config.chaptersList);
		const chapters = Array.from(chapterNodes).map(li => {
			const link = li.querySelector(config.chapterLink);
			const titleSpan = li.querySelector(config.chapterTitle);
			return {
				title: titleSpan?.innerText.trim() || '',
				url: link?.href || '',
			};
		});

		return { title, description, chapters };
	}, comicDetailConfig);

	await browser.close();
	return data;
}

module.exports = scrapeComicDetail;
