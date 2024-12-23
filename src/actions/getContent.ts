import { Day, toDay, toSeconds } from '../helpers';

import { Page } from 'puppeteer';
import { contentConfig } from '../config';
import dotenv from 'dotenv';

dotenv.config();

type PossibleTrack = {
	id: string;
	name: string;
};

type LapTimeByDate = {
	date: Day;
	lapTime: number;
};

type ResultData = Record<string, LapTimeByDate[]>;

async function loadAllTrackContent(page: Page) {
	const showMoreSelector = contentConfig.selectors.showMore;

	while (await page.$(showMoreSelector)) {
		await page.waitForSelector(showMoreSelector, {
			visible: true,
			timeout: 10_000,
		});
		await page.click(showMoreSelector);
	}

	console.log('Loaded all content for track');
}

async function getContentOfOneTrack(page: Page): Promise<LapTimeByDate[]> {
	const lapTimesByDate = await page.evaluate(() => {
		const resultContainers = [
			...document.querySelectorAll(contentConfig.selectors.container),
		].reverse();

		const lapTimesContainers = resultContainers.flatMap(
			(element) => [
				...element.querySelectorAll(contentConfig.selectors.lapTime),
			],
		);

		return lapTimesContainers.map((container) => ({
			date: toDay(
				container
					?.closest(contentConfig.selectors.container)
					?.querySelector(contentConfig.selectors.date)
					?.innerText.trim(),
			),
			lapTime: toSeconds(
				container.textContent
					?.replaceAll('\n', '')
					.replaceAll('\t', '')
					.trim(),
			),
		}));
	});

	return lapTimesByDate;
}

async function getPossibleTracks(page: Page): Promise<PossibleTrack[]> {
	await page.waitForSelector(contentConfig.selectors.trackOption, {
		visible: true,
		timeout: 10_000,
	});

	const possibleTracks = await page.evaluate(() => {
		const tracksElements = [
			...document.querySelectorAll(contentConfig.selectors.trackOption),
		];

		return tracksElements.map((track) => ({
			id: track.value,
			name: track.textContent,
		}));
	});

	return possibleTracks;
}

async function changeTrack(page: Page, trackId: string) {
	await page.select(contentConfig.selectors.selectTracks, trackId);
}

export async function getContent(page: Page) {
	await page.goto(contentConfig.url, { waitUntil: 'networkidle2' });
	const possibleTracks = await getPossibleTracks(page);
	const resultData: ResultData = {};

	for (const track of possibleTracks) {
		await changeTrack(page, track.id);
		await loadAllTrackContent(page);
		const result = await getContentOfOneTrack(page);
		resultData[track.name] = result;
	}

	return resultData;
}
