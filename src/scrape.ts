import { login } from './actions/login';
import { loginConfig } from './config';
import puppeteer from 'puppeteer';

export default async function scrape() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await login(page);

	await browser.close();
}
