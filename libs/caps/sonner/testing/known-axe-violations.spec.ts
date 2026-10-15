import axe, { type Result } from 'axe-core';
import { partitionKnownSonnerViolations } from './known-axe-violations';

let root: HTMLElement;
let raw: Result[];
beforeAll(async () => {
	root = document.createElement('main');
	root.innerHTML =
		'<h1>Known Sonner audit fixture</h1><caps-toaster><brn-sonner-toaster><section aria-label="Notifications"><ol data-sonner-toaster class="caps-toaster"><brn-sonner-toast><li id="known-sonner-toast" data-sonner-toast class="caps-toast" role="status" aria-live="polite" aria-atomic="true" tabindex="0">Saved document</li></brn-sonner-toast></ol></section></brn-sonner-toaster></caps-toaster>';
	document.body.append(root);
	raw = (await axe.run(root)).violations;
});
afterAll(() => root.remove());
function rule(id: string) {
	const found = raw.find((result) => result.id === id);
	if (!found) throw new Error(`Real axe fixture no longer produces ${id}; review/remove the exception`);
	return found;
}
it('classifies both actual known findings and preserves all original nodes/checks', () => {
	const result = partitionKnownSonnerViolations(raw, root);
	expect(result.remaining).toEqual([]);
	expect(result.missingExpected).toEqual([]);
	expect(result.acceptedKnown.map((r) => r.id).sort()).toEqual(['aria-allowed-role', 'list']);
	for (const accepted of result.acceptedKnown) {
		expect(accepted.nodes[0]).toBe(rule(accepted.id).nodes[0]);
		expect(accepted.nodes[0].any).toBe(rule(accepted.id).nodes[0].any);
		expect(accepted.nodes[0].none).toBe(rule(accepted.id).nodes[0].none);
	}
});
it('keeps an unknown sibling node of the SAME rule instead of accepting the whole violation', () => {
	const alien = document.createElement('li');
	alien.id = 'alien-sonner-node';
	alien.setAttribute('role', 'status');
	root.append(alien);
	try {
		const original = rule('aria-allowed-role');
		const unknown = { ...original.nodes[0], html: alien.outerHTML, target: ['#alien-sonner-node'], element: undefined };
		const mixed = { ...original, nodes: [original.nodes[0], unknown] };
		const result = partitionKnownSonnerViolations([mixed], root);
		expect(result.acceptedKnown[0].nodes).toEqual([original.nodes[0]]);
		expect(result.remaining[0].nodes).toEqual([unknown]);
		expect(result.remaining[0].nodes[0].any).toBe(unknown.any);
		expect(mixed.nodes).toHaveLength(2);
	} finally {
		alien.remove();
	}
});
it('keeps another rule even on the otherwise known toast', () => {
	const changed = { ...rule('aria-allowed-role'), id: 'color-contrast' };
	expect(partitionKnownSonnerViolations([changed], root).remaining).toEqual([changed]);
});
it('rejects changed check data and unexpected related checks', () => {
	const original = rule('list');
	const node = original.nodes[0];
	const check = node.none[0];
	for (const changedCheck of [
		{ ...check, data: { values: 'div' } },
		{ ...check, id: 'different-check' },
		{ ...check, relatedNodes: [...check.relatedNodes, { html: '<div>', target: ['#unknown-related-node'] }] },
	]) {
		const changed = { ...original, nodes: [{ ...node, none: [changedCheck] }] };
		expect(partitionKnownSonnerViolations([changed], root).remaining).toEqual([changed]);
	}
});
it('rejects another related DOM node even when its tag matches', () => {
	const extra = document.createElement('brn-sonner-toast');
	extra.id = 'unrelated-brain-host';
	root.append(extra);
	try {
		const original = rule('list');
		const node = original.nodes[0];
		const check = node.none[0];
		const changed = {
			...original,
			nodes: [
				{
					...node,
					none: [{ ...check, relatedNodes: [{ html: '<brn-sonner-toast>', target: ['#unrelated-brain-host'] }] }],
				},
			],
		};
		expect(partitionKnownSonnerViolations([changed], root).remaining).toEqual([changed]);
	} finally {
		extra.remove();
	}
});
it('rejects changed outerHTML, added any/all/none checks and changed status data', () => {
	const original = rule('aria-allowed-role');
	const node = original.nodes[0];
	const check = node.any[0];
	for (const changedNode of [
		{ ...node, html: '<div data-sonner-toast class="caps-toast" role="status">' },
		{ ...node, all: [check] },
		{ ...node, none: [check] },
		{ ...node, any: [check, check] },
		{ ...node, any: [{ ...check, data: ['alert'] }] },
		{ ...node, any: [{ ...check, relatedNodes: [{ html: '<div>', target: ['#other'] }] }] },
	]) {
		const changed = { ...original, nodes: [changedNode] };
		expect(partitionKnownSonnerViolations([changed], root).remaining).toEqual([changed]);
	}
});
it('detects obsolete exceptions rather than silently passing when a finding disappears', () => {
	expect(partitionKnownSonnerViolations([], root).missingExpected).toEqual(['list', 'aria-allowed-role']);
	expect(partitionKnownSonnerViolations([rule('list')], root).missingExpected).toEqual(['aria-allowed-role']);
});
it('rejects an unrelated list and retains an empty/unknown violation for review', () => {
	const alien = document.createElement('ol');
	alien.id = 'unrelated-list';
	root.append(alien);
	try {
		const original = rule('list');
		const changed = {
			...original,
			nodes: [{ ...original.nodes[0], target: ['#unrelated-list'], html: alien.outerHTML, element: undefined }],
		};
		expect(partitionKnownSonnerViolations([changed], root).remaining).toEqual([changed]);
		const empty = { ...original, nodes: [] };
		expect(partitionKnownSonnerViolations([empty], root).remaining).toEqual([empty]);
		const duplicate = root.querySelector('#known-sonner-toast')!.cloneNode(true);
		alien.append(duplicate);
		try {
			expect(partitionKnownSonnerViolations([rule('aria-allowed-role')], root).remaining).toEqual([
				rule('aria-allowed-role'),
			]);
		} finally {
			duplicate.parentNode?.removeChild(duplicate);
		}
	} finally {
		alien.remove();
	}
});
