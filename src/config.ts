export const RESULT_DIRECTORY = `out/lap_times_${Date.now()}.txt`;

export const loginConfig = {
	url: 'https://www.racefacer.com/profile/sessions',
	selectors: {
		'submit': 'button.login-button',
		'usernameInput': 'input#username',
		'passwordInput': 'input#password',
	},
};

export const contentConfig = {
	url: 'https://www.racefacer.com/profile/sessions',
	selectors: {
		showMore: 'a.show-more.load-more-sessions-btn',
		trackOption: 'select.select_box.track option',
		container: 'div.session-result-container',
		lapTime: 'a.time_laps.first',
		date: 'span.date',
		selectTracks: 'select[name="track_configuration_id"]',
	},
};
