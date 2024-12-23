import puppeteer from 'puppeteer';

export default async function scrape() {
	const browser = await puppeteer.launch();
	const browserPage = await browser.newPage();

	await browser.close();
}
