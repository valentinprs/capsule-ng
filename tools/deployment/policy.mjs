export const repository = 'valentinprs/capsule-ng';
export const commentMarker = '<!-- capsule-deployments -->';

export const deploymentPolicyVersion = 2;
export function currentDraftEvent(event, remote) {
	return remote?.state === 'open' && remote.draft === true && event.pull_request?.head.sha === remote.head.sha;
}
export const previewLabel = 'capsule-preview';
export function previewRequested(event) {
	return Boolean(event.inputs) || (event.action === 'labeled' && event.label?.name === previewLabel);
}
export function deploymentContext(event, remote) {
	if (event.inputs) {
		const pr = event.inputs.pr;
		if (!/^[1-9]\d*$/.test(pr ?? '') || !Number.isSafeInteger(Number(pr))) throw new Error('Invalid manual PR number');
		if (!/^[a-f0-9]{40}$/.test(event.inputs.sha ?? ''))
			throw new Error('Manual preview requires the exact current SHA');
		if (!['main', 'develop', 'refs/heads/main', 'refs/heads/develop'].includes(event.ref))
			throw new Error('Untrusted workflow dispatch ref');
		if (!remote || remote.number !== Number(pr) || remote.state !== 'open' || remote.head.sha !== event.inputs.sha)
			throw new Error('Manual request is stale or PR is closed');
		if (remote.head.repo.full_name !== repository || remote.base.repo.full_name !== repository)
			throw new Error('Only same-repository PRs may deploy');
		return { pr: Number(pr), sha: event.inputs.sha, cleanup: false, production: false, requested: true };
	}
	if (event.pull_request) {
		const pr = event.pull_request;
		if (pr.head.repo.full_name !== repository || pr.base.repo.full_name !== repository)
			throw new Error('Only same-repository PRs may deploy');
		if (!['opened', 'synchronize', 'reopened', 'closed', 'ready_for_review', 'labeled'].includes(event.action))
			throw new Error('Unsupported PR event');
		if (!Number.isSafeInteger(pr.number) || pr.number < 1) throw new Error('Invalid PR number');
		const requested = previewRequested(event);
		if (event.action === 'labeled' && !requested) throw new Error('Unsupported preview label');
		if (event.action !== 'closed' && pr.draft && !requested)
			throw new Error('Draft previews require an explicit request');
		return { pr: pr.number, sha: pr.head.sha, cleanup: event.action === 'closed', production: false, requested };
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
	return context.production
		? remote.sha === context.sha
		: remote.state === 'open' &&
				remote.head.repo?.full_name === repository &&
				remote.base.repo?.full_name === repository &&
				remote.head.sha === context.sha &&
				(context.requested || !remote.draft);
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
