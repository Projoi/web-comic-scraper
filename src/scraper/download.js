const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');

async function downloadImage(url, savePath) {
	const res = await axios.get(url, { responseType: 'stream' });
	await fs.ensureDir(path.dirname(savePath));

	const ext = mime.extension(res.headers['content-type']) || 'jpg';
	const fullPath = `${savePath}.${ext}`;

	const writer = fs.createWriteStream(fullPath);
	res.data.pipe(writer);

	return new Promise((resolve, reject) => {
		writer.on('finish', () => resolve(fullPath));
		writer.on('error', reject);
	});
}

module.exports = downloadImage;
