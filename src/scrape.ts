import { bypassCookies } from './actions/bypassCookies.ts';
import { getContent } from './actions/getContent.ts';
import { login } from './actions/login.ts';
import puppeteer from 'puppeteer';
import { puppeteerConfig } from './config.ts';
import { saveToFile } from './actions/saveToFile.ts';

export default async function scrape() {
	const browser = await puppeteer.launch(puppeteerConfig);
	const page = await browser.newPage();
	await login(page);
	await bypassCookies(page);
	const content = await getContent(page);

	saveToFile(content);

	await browser.close();
}
