import { Day, sleep, toSeconds } from '../helpers.ts';

import { Page } from 'puppeteer';
import { contentConfig } from '../config.ts';

type PossibleTrack = {
	id: string;
	name: string;
};

type LapTimeByDate = {
	date?: Day;
	lapTime?: number;
};

type ResultData = Record<string, LapTimeByDate[]>;

const SHOW_MORE_SLEEP_MS = 2_000;

async function loadAllTrackContent(page: Page) {
	const showMoreSelector = contentConfig.selectors.showMore;

	while (await page.$(showMoreSelector)) {
		try {
			await page.waitForSelector(showMoreSelector, {
				visible: true,
				timeout: 5_000,
			});
			await page.click(showMoreSelector);
			await sleep(SHOW_MORE_SLEEP_MS);
		} catch (error: any) {
			console.log('Clicked show more button to the end of the list');
			break;
		}
	}

	console.log('Loaded all content for track');
}

async function getContentOfOneTrack(page: Page): Promise<LapTimeByDate[]> {
	const rawLapTimesByDate = await page.evaluate((contentConfig) => {
		const resultContainers = [
			...document.querySelectorAll(contentConfig.selectors.container),
		].reverse();

		console.log(resultContainers.length);

		const lapTimesContainers = resultContainers.flatMap((element) => [
			...element.querySelectorAll(contentConfig.selectors.lapTime),
		]);

		return lapTimesContainers.map((container) => {
			const date = container
				?.closest(contentConfig.selectors.container)
				?.querySelector(contentConfig.selectors.date)
				?.textContent?.trim();
			const lapTime = container.textContent
				?.replaceAll('\n', '')
				.replaceAll('\t', '')
				.trim();
			return {
				date,
				lapTime,
			};
		});
	}, contentConfig);

	const lapTimesByDate = rawLapTimesByDate.map(({ date, lapTime }) => ({
		date: date ? date as Day : undefined,
		lapTime: lapTime ? toSeconds(lapTime) : undefined,
	}));

	return lapTimesByDate;
}

async function getPossibleTracks(page: Page): Promise<PossibleTrack[]> {
	await page.waitForSelector(contentConfig.selectors.trackOption, {
		timeout: 10_000,
	});

	const possibleTracks = await page.evaluate((contentConfig) => {
		const tracksElements: any[] = [
			...document.querySelectorAll(contentConfig.selectors.trackOption),
		];

		return tracksElements.map((track) => ({
			id: track.value,
			name: track.textContent?.trim(),
		})).filter((track) => track.id !== '0');
	}, contentConfig);

	console.log(`Possible tracks: ${JSON.stringify(possibleTracks)}`);

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
		console.log(`Started scraping data for track "${track.name}"`);
		await changeTrack(page, track.id);
		await loadAllTrackContent(page);
		const result = await getContentOfOneTrack(page);
		resultData[track.name] = result;
		console.log(`Successfully scraped all data for track "${track.name}`);
	}

	return resultData;
}
