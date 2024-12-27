export const RESULT_DIRECTORY = `out/lap_times_${Date.now()}.txt`;

export const loginConfig = {
	url: 'https://www.racefacer.com/profile/sessions',
	selectors: {
		'submit': 'button.login-button',
		'usernameInput': 'input[name="username"]',
		'passwordInput': 'input[name="password"]',
	},
};

export const contentConfig = {
	url: 'https://www.racefacer.com/profile/sessions',
	selectors: {
		showMore: 'a.show-more.load-more-sessions-btn',
		trackOption: 'select[name="track_configuration_id"] option',
		container: 'div.session-result-container',
		lapTime: 'a.time_laps.first',
		date: 'span.date',
		selectTracks: 'select[name="track_configuration_id"]',
		denyCookie: 'button.ch2-btn.ch2-deny-all-btn.ch2-btn-primary',
	},
};

export const fileSaveConfig = {
	outDir: `out`,
	fileName: `scrape_result_${Date.now()}.json`,
};

export const puppeteerConfig = {
	headless: true,
};
