const { Translate } = require('@google-cloud/translate').v2;
const path = require('path');

const keyFile =
	process.env.GOOGLE_APPLICATION_API_KEY ||
	path.resolve(__dirname, './api-key.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = keyFile;

const apiKey = require(keyFile);
const translate = new Translate({ projectId: apiKey.project_id });

module.exports = async function trans(input = '', { target = 'en' } = {}) {
	if (typeof input !== 'string') {
		throw new Error('Input text must be string');
	}
	const [translation] = await translate.translate(input, target);
	return translation;
};
