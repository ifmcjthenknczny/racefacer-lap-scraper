export function toSeconds(timeString: string): number {
	const DECIMAL_PLACES = 3;
	const minutes = +timeString.split(':')[0];
	const seconds = +timeString.split(':')[1];
	const totalSeconds = seconds + 60 * minutes;

	return parseFloat(totalSeconds.toFixed(DECIMAL_PLACES));
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export type Day = `${number}.${number}.${number}`;
