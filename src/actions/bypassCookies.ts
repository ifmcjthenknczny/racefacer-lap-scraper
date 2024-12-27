import { Page } from 'puppeteer';
import { contentConfig } from './../config.ts';

export async function bypassCookies(page: Page) {
	try {
		await page.waitForSelector(contentConfig.selectors.denyCookie, {
			visible: true,
			timeout: 10_000,
		});
		await page.click(contentConfig.selectors.denyCookie);
		console.log('Clicked a cookie button!');
	} catch (err: any) {
		console.error('Error during clicking a cookie button');
	}
}
