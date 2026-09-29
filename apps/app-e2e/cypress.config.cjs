const { nxE2EPreset } = require('@nx/cypress/plugins/cypress-preset');
const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		...nxE2EPreset(__dirname),
		// Must match the port of the `app:serve:e2e` configuration (kept off 4200 so a local
		// `nx serve app` can keep running alongside the e2e run).
		baseUrl: 'http://localhost:4300',
		// The first request to the Vite dev server compiles the page on demand (SSR + client).
		defaultCommandTimeout: 20000,
		pageLoadTimeout: 120000,
		video: false,
		setupNodeEvents(on) {
			// Print axe violations to the terminal (the Cypress command log is only visible in open mode).
			on('task', {
				log(message) {
					console.log(message);
					return null;
				},
				table(rows) {
					console.table(rows);
					return null;
				},
			});
		},
	},
});
