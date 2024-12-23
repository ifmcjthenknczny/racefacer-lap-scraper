import { Page } from 'puppeteer';
import { loginConfig } from '../config';
import process from 'node:process';

export const login = async (page: Page): Promise<void> => {
	try {
		await page.goto(loginConfig.url, { waitUntil: 'networkidle2' });

		await page.waitForSelector(loginConfig.selectors.usernameInput);
		await page.type(
			loginConfig.selectors.usernameInput,
			process.env.USERNAME!,
		);

		await page.waitForSelector(loginConfig.selectors.passwordInput);
		await page.type(
			loginConfig.selectors.passwordInput,
			process.env.PASSWORD!,
		);

		await page.waitForSelector(loginConfig.selectors.submit);
		await page.click(loginConfig.selectors.submit);

		await page.waitForNavigation({ waitUntil: 'networkidle2' });

		console.log('Login successful');
	} catch (error) {
		console.error('Error during login:', error);
	}
};
