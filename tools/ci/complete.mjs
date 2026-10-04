import { appendFile, readFile } from 'node:fs/promises';
import { completeValidation } from './policy.mjs';
const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, 'utf8'));
let remote;
if (process.env.GITHUB_EVENT_NAME === 'pull_request') {
	const response = await fetch(
		`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/pulls/${event.pull_request.number}`,
		{
			headers: { Authorization: `Bearer ${process.env.GH_TOKEN}`, 'User-Agent': 'capsule-ci' },
		},
	);
	if (!response.ok) throw new Error(`Cannot verify current PR: ${response.status}`);
	remote = await response.json();
}
try {
	completeValidation(event, process.env.GITHUB_EVENT_NAME, JSON.parse(process.env.CI_RESULTS), remote);
	await appendFile(
		process.env.GITHUB_STEP_SUMMARY,
		'Full validation passed: quick checks, full builds and full E2E on the current ready SHA.\n',
	);
} catch (error) {
	await appendFile(process.env.GITHUB_STEP_SUMMARY, `${error.message}\nThis check does not authorize merging.\n`);
	throw error;
}
