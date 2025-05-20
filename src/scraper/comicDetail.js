const axios = require('axios');
const cheerio = require('cheerio');
const { listUrl } = require('../config');

async function scrapeComicDetail(url) {
	const res = await axios.get(url);
	const $ = cheerio.load(res.data);

	const title = $('div#Judul h1 span').text().trim();
	const description = $('div#Judul p.desc').text().trim();
	const chapters = [];

	$('tr td.judulseries').each((i, el) => {
		const chapterTitle = $(el).find('a').attr('title').trim();
		const chapterUrl = $(el).find('a').attr('href');
		chapters.push({ title: chapterTitle, url: listUrl+chapterUrl });
	});

	return {
		title,
		description,
		chapters,
	};
}

module.exports = scrapeComicDetail;
