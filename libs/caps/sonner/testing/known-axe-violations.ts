import type { CheckResult, NodeResult, Result } from 'axe-core';

/** Test-only exceptions authorized for #56. Never exported by the package entry point. */
export const knownSonnerRules = ['list', 'aria-allowed-role'] as const;
type AuditRoot = Document | Element;

function resolve(root: AuditRoot, target: NodeResult['target']): Element | null {
	if (target.length !== 1 || typeof target[0] !== 'string') return null;
	try {
		const matches = root.querySelectorAll(target[0]);
		return matches.length === 1 ? matches[0] : null;
	} catch {
		return null;
	}
}
function snapshotMatches(root: AuditRoot, html: string, selector: string): boolean {
	const document = root.nodeType === 9 ? (root as Document) : root.ownerDocument!;
	const template = document.createElement('template');
	template.innerHTML = html;
	return template.content.children.length === 1 && !!template.content.firstElementChild?.matches(selector);
}
function isCapsList(element: Element): boolean {
	return (
		element.matches('ol[data-sonner-toaster].caps-toaster') &&
		element.parentElement?.matches('section') === true &&
		element.parentElement.parentElement?.matches('brn-sonner-toaster') === true &&
		element.parentElement.parentElement.parentElement?.matches('caps-toaster') === true
	);
}
function isCapsStatus(element: Element): boolean {
	return (
		element.matches('li[data-sonner-toast].caps-toast[role="status"][aria-atomic="true"][tabindex="0"]') &&
		['polite', 'assertive'].includes(element.getAttribute('aria-live') ?? '') &&
		element.parentElement?.matches('brn-sonner-toast') === true &&
		!!element.parentElement.parentElement &&
		isCapsList(element.parentElement.parentElement)
	);
}
function exactListCheck(check: CheckResult, root: AuditRoot, list: Element): boolean {
	const hosts = Array.from(list.children);
	if (
		!hosts.length ||
		hosts.some(
			(host) => !host.matches('brn-sonner-toast') || host.children.length !== 1 || !isCapsStatus(host.children[0]),
		)
	)
		return false;
	if (
		check.id !== 'only-listitems' ||
		check.impact !== 'serious' ||
		JSON.stringify(check.data) !== JSON.stringify({ values: 'brn-sonner-toast' }) ||
		(check.relatedNodes ?? []).length !== hosts.length
	)
		return false;
	const related = (check.relatedNodes ?? []).map((node) => {
		if (!snapshotMatches(root, node.html, 'brn-sonner-toast')) return null;
		return resolve(root, node.target);
	});
	return new Set(related).size === hosts.length && hosts.every((host) => related.includes(host));
}
function isKnown(rule: Result, node: NodeResult, root: AuditRoot): boolean {
	const element = resolve(root, node.target);
	if (!element || (node.element && node.element !== element)) return false;
	if (rule.id === 'list' && rule.impact === 'serious' && node.impact === 'serious') {
		return (
			isCapsList(element) &&
			snapshotMatches(root, node.html, 'ol[data-sonner-toaster].caps-toaster') &&
			node.any.length === 0 &&
			node.all.length === 0 &&
			node.none.length === 1 &&
			exactListCheck(node.none[0], root, element)
		);
	}
	if (rule.id === 'aria-allowed-role' && rule.impact === 'minor' && node.impact === 'minor') {
		const check = node.any[0];
		return (
			isCapsStatus(element) &&
			snapshotMatches(
				root,
				node.html,
				'li[data-sonner-toast].caps-toast[role="status"][aria-atomic="true"][tabindex="0"]',
			) &&
			node.any.length === 1 &&
			node.all.length === 0 &&
			node.none.length === 0 &&
			check.id === 'aria-allowed-role' &&
			check.impact === 'minor' &&
			JSON.stringify(check.data) === JSON.stringify(['status']) &&
			(check.relatedNodes ?? []).length === 0
		);
	}
	return false;
}

/** Partition nodes, preserving every original check and related node on both sides. */
export function partitionKnownSonnerViolations(violations: readonly Result[], root: AuditRoot) {
	const acceptedKnown: Result[] = [];
	const remaining: Result[] = [];
	for (const violation of violations) {
		const accepted: NodeResult[] = [];
		const rejected: NodeResult[] = [];
		for (const node of violation.nodes) (isKnown(violation, node, root) ? accepted : rejected).push(node);
		if (accepted.length) acceptedKnown.push({ ...violation, nodes: accepted });
		if (rejected.length || !violation.nodes.length) remaining.push({ ...violation, nodes: rejected });
	}
	return {
		acceptedKnown,
		remaining,
		missingExpected: knownSonnerRules.filter((id) => !acceptedKnown.some((result) => result.id === id)),
	};
}
