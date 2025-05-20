const axios = require('axios');
const cheerio = require('cheerio');
const { listUrl } = require('../config');

async function scrapeComicList() {
	const res = await axios.get(listUrl);
	const $ = cheerio.load(res.data);

	const comics = [];

	$('article.ls2').each((i, el) => {
		const title = $(el).find('div.ls2j h3').text().trim();
		const url = listUrl + $(el).find('div.ls2j h3 a').attr('href');
		// const cover = $(el).find('div.ls2v a img').attr('src');
		comics.push({ title, url /* cover */ });
	});

	return comics;
}

module.exports = scrapeComicList;
