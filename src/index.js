const scrapeComicList = require('./scraper/comicList');
const scrapeComicDetail = require('./scraper/comicDetail');
const scrapeChapterImages = require('./scraper/chapter');
const downloadImage = require('./scraper/download');
const delay = require('./utils/delay');
const fs = require('fs-extra');
const path = require('path');
const { saveDir, delayBetweenRequests } = require('./config');

(async () => {
	/* Scrape List comics */
	// const list = await scrapeComicList();
	// console.log(list);

	/* Scrape specific detail page */
	// const detail = await scrapeComicDetail("https://komiku.id/manga/aoppella-hajimari-no-playlist/"); //URL NEED
	// console.log(detail);

	/* Scrape Image from specific chapters */
	// const chapterImages = await scrapeChapterImages("https://komiku.id/aoppella-hajimari-no-playlist-chapter-1/");
	// console.log(chapterImages);

	
	/* Scrape all from root */
	// const list = await scrapeComicList();
	// for (const comic of list.slice(0, 3)) { // test dulu 3 komik
	// 	console.log(`🧩 Scraping: ${comic.title}`);
	// 	const detail = await scrapeComicDetail(comic.url);
	// 	const comicDir = path.join(saveDir, comic.title.replace(/[\/\\?%*:|"<>]/g, '_'));
	// 	await fs.ensureDir(comicDir);
	// 	await fs.writeFile(path.join(comicDir, 'info.json'), JSON.stringify(detail, null, 2));

	// 	for (const chapter of detail.chapters.slice(0, 1)) {
	// 		console.log(`  ➤ Chapter: ${chapter.title}`);
	// 		const chapterImages = await scrapeChapterImages(chapter.url);
	// 		const chapterDir = path.join(comicDir, chapter.title.replace(/[\/\\?%*:|"<>]/g, '_'));
	// 		for (let i = 0; i < chapterImages.length; i++) {
	// 		    console.log(`       ➤ Image: ${i + 1}`);
	// 			const imgUrl = chapterImages[i];
	// 			const savePath = path.join(chapterDir, `${i + 1}`);
	// 			await downloadImage(imgUrl, savePath);
	// 			await delay(500); // antar gambar
	// 		}
	// 		await delay(delayBetweenRequests); // antar chapter
	// 	}
	// }

	
	/* Scrape detail until download image */
	// 	const detail = await scrapeComicDetail(comic.url);
	// 	const comicDir = path.join(saveDir, comic.title.replace(/[\/\\?%*:|"<>]/g, '_'));
	// 	await fs.ensureDir(comicDir);
	// 	await fs.writeFile(path.join(comicDir, 'info.json'), JSON.stringify(detail, null, 2));

	// 	for (const chapter of detail.chapters.slice(0, 1)) {
	// 		console.log(`  ➤ Chapter: ${chapter.title}`);
	// 		const chapterImages = await scrapeChapterImages(chapter.url);
	// 		const chapterDir = path.join(comicDir, chapter.title.replace(/[\/\\?%*:|"<>]/g, '_'));
	// 		for (let i = 0; i < chapterImages.length; i++) {
	// 		    console.log(`       ➤ Image: ${i + 1}`);
	// 			const imgUrl = chapterImages[i];
	// 			const savePath = path.join(chapterDir, `${i + 1}`);
	// 			await downloadImage(imgUrl, savePath);
	// 			await delay(500); // antar gambar
	// 		}
	// 		await delay(delayBetweenRequests); // antar chapter
	// 	}
	// }

	const dummyImage = [
		'https://cdn.komiku.id/uploads2/2581765-1.jpg',
		'https://cdn.komiku.id/uploads2/2581765-2.jpg',
		'https://cdn.komiku.id/uploads2/2581765-3.jpg',
		'https://cdn.komiku.id/uploads2/2581765-4.jpg',
		'https://cdn.komiku.id/uploads2/2581765-5.jpg',
		'https://cdn.komiku.id/uploads2/2581765-6.jpg',
		'https://cdn.komiku.id/uploads2/2581765-7.jpg',
		'https://cdn.komiku.id/uploads2/2581765-8.jpg',
		'https://cdn.komiku.id/uploads2/2581765-9.jpg',
		'https://cdn.komiku.id/uploads2/2581765-10.jpg'
	]

	for (let i = 0; i < dummyImage.length; i++) {
		console.log(`➤ Image: ${i + 1}`);
		const imgUrl = dummyImage[i];
		const savePath = path.join("data", `${i + 1}`);
		await downloadImage(imgUrl, savePath);
		await delay(500); // antar gambar
	}
	await delay(delayBetweenRequests); // antar chapter
	
	
})();
