const puppeteer = require('puppeteer');
const {chapterConfig} = require("../configs/komiku.id")

async function scrapeChapterImages(chapterUrl) {
	const browser = await puppeteer.launch({ headless: 'new' });
	const page = await browser.newPage();

	await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
	await page.goto(chapterUrl, {
		waitUntil: 'networkidle2', // tunggu sampai semua permintaan selesai
		timeout: 30000
	});

	// Tunggu sampai #readerarea muncul
	await page.waitForSelector(chapterConfig.imagesSelector, { timeout: 100000 });

	// Ambil semua src gambar dari #readerarea
	const images = await page.$$eval(chapterConfig.imagesSelector, imgs => 
		imgs
			.map(img => 
				img.dataset.src || img.dataset.lazySrc || img.src || img.getAttribute('srcset')?.split(',')[0].split(' ')[0]
			)
			.filter(src => src && !src.includes('readerarea.svg'))
	);

	await browser.close();
	return images;
}

module.exports = scrapeChapterImages;
