import dayjs from 'dayjs';

export function toSeconds(timeString: string) {
	return +timeString.split(':')[1] + 60 * +timeString.split(':')[0];
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export type Day = `${number}-${number}-${number}`;

export function toDay(date: string | Date) {
	return dayjs(date).format('YYYY-MM-DD') as Day;
}
