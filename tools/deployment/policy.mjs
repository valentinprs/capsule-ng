export const repository = 'valentinprs/capsule-ng';
export const commentMarker = '<!-- capsule-deployments -->';

export function deploymentContext(event) {
	if (event.pull_request) {
		const pr = event.pull_request;
		if (pr.head.repo.full_name !== repository || pr.base.repo.full_name !== repository)
			throw new Error('Only same-repository PRs may deploy');
		if (!['opened', 'synchronize', 'reopened', 'closed'].includes(event.action))
			throw new Error('Unsupported PR event');
		if (!Number.isSafeInteger(pr.number) || pr.number < 1) throw new Error('Invalid PR number');
		return { pr: pr.number, sha: pr.head.sha, cleanup: event.action === 'closed', production: false };
	}
	const run = event.workflow_run;
	if (
		run?.event !== 'push' ||
		run.head_branch !== 'main' ||
		run.conclusion !== 'success' ||
		run.repository.full_name !== repository
	)
		throw new Error('Production requires successful main push CI');
	return { sha: run.head_sha, production: true, cleanup: false };
}

export function ownsPreview(deployment, projectId, pr) {
	return (
		deployment.projectId === projectId &&
		deployment.target !== 'production' &&
		deployment.meta?.capsuleRepository === repository &&
		deployment.meta?.capsulePr === String(pr)
	);
}

export function previewAlias(project, pr) {
	if (!['capsule-ng', 'capsule-ng-storybook'].includes(project) || !Number.isSafeInteger(pr) || pr < 1)
		throw new Error('Invalid preview alias');
	return `${project}-pr-${pr}.vercel.app`;
}

export function isCurrent(context, remote) {
	return context.production ? remote.sha === context.sha : remote.state === 'open' && remote.head.sha === context.sha;
}

export function deploymentUrl(output) {
	// CLI versions support both plain URL output and structured non-interactive output.
	const urls = output.match(/https:\/\/[a-zA-Z0-9.-]+\.vercel\.app(?=[\s"',}]|$)/g);
	if (!urls?.length) throw new Error('CLI did not return a deployment URL');
	return urls.at(-1);
}

export function deploymentMetadata(context) {
	return {
		capsuleRepository: repository,
		capsuleSha: context.sha,
		...(context.production ? {} : { capsulePr: String(context.pr) }),
	};
}
