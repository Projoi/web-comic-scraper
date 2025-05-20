const scrapeList = require('./scraper/comicList');
const scrapeDetail = require('./scraper/comicDetail');
const scrapeChapter = require('./scraper/chapter');
const downloadImage = require('./scraper/download');
const delay = require('./utils/delay');
const fs = require('fs-extra');
const path = require('path');
const { saveDir, delayBetweenRequests } = require('./config');

(async () => {
	const list = await scrapeList();
	for (const comic of list.slice(0, 3)) { // test dulu 3 komik
		console.log(`🧩 Scraping: ${comic.title}`);
		const detail = await scrapeDetail(comic.url);
		const comicDir = path.join(saveDir, comic.title.replace(/[\/\\?%*:|"<>]/g, '_'));
		await fs.ensureDir(comicDir);
		await fs.writeFile(path.join(comicDir, 'info.json'), JSON.stringify(detail, null, 2));

		for (const chapter of detail.chapters.slice(0, 1)) {
			console.log(`  ➤ Chapter: ${chapter.title}`);
			const chapterImages = await scrapeChapter(chapter.url);
			const chapterDir = path.join(comicDir, chapter.title.replace(/[\/\\?%*:|"<>]/g, '_'));
			for (let i = 0; i < chapterImages.length; i++) {
			    console.log(`       ➤ Image: ${i + 1}`);
				const imgUrl = chapterImages[i];
				const savePath = path.join(chapterDir, `${i + 1}`);
				await downloadImage(imgUrl, savePath);
				await delay(500); // antar gambar
			}
			await delay(delayBetweenRequests); // antar chapter
		}
	}
})();
