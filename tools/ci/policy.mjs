export const quickJobs = ['commitlint', 'format-and-lint', 'types', 'unit'];
export const fullJobs = [...quickJobs, 'build', 'e2e'];
export function fullValidation(event, eventName) {
	if (eventName === 'push') return ['refs/heads/main', 'refs/heads/develop'].includes(event.ref);
	return eventName === 'pull_request' && event.pull_request?.draft === false;
}
export function quickResult(jobs) {
	const selected = quickJobs.map((name) => jobs.find((job) => job.name === name));
	if (selected.some((job) => job?.status === 'completed' && job.conclusion !== 'success')) return 'failure';
	return selected.every((job) => job?.status === 'completed' && job.conclusion === 'success') ? 'success' : 'pending';
}
export function completeValidation(event, eventName, results, remote) {
	if (!fullValidation(event, eventName))
		throw new Error('Draft CI is preliminary; mark ready for review to validate fully.');
	if (
		eventName === 'pull_request' &&
		(remote?.state !== 'open' || remote.draft || remote.head.sha !== event.pull_request.head.sha)
	)
		throw new Error('PR state or SHA changed; the current ready PR must pass full CI.');
	if (!fullJobs.every((name) => results[name] === 'success'))
		throw new Error('All quick checks, full builds and full E2E must succeed.');
}

export function latestQuickRun(runs, context, repository) {
	return runs
		.filter(
			(run) =>
				run.head_sha === context.sha &&
				run.head_repository?.full_name === repository &&
				run.pull_requests?.some((pr) => pr.number === context.pr),
		)
		.sort((a, b) => b.id - a.id)[0];
}
