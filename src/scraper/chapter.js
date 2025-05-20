const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeChapterImages(chapterUrl) {
	const res = await axios.get(chapterUrl);
	const $ = cheerio.load(res.data);

	const images = [];
	$('div img.ww').each((i, el) => {
		const img = $(el).attr('src');
		images.push(img);
	});

	return images;
}

module.exports = scrapeChapterImages;
