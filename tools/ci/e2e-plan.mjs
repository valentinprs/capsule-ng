// Spec durations in seconds, measured on CI run 39407596159. They only balance the shards: a spec
// missing here counts as `unknownDuration`, so a new spec never needs an entry to run.
export const durations = {
	'action-menus.cy.ts': 79,
	'alert-empty.cy.ts': 77,
	'breadcrumb.a11y.cy.ts': 7,
	'button.a11y.cy.ts': 10,
	'calendar.cy.ts': 27,
	'catalogue-links.cy.ts': 10,
	'command-kbd.cy.ts': 35,
	'composed-inputs.a11y.cy.ts': 98,
	'composed-inputs.geometry.cy.ts': 8,
	'conversation-flow.cy.ts': 45,
	'data-table.cy.ts': 171,
	'date-picker.cy.ts': 21,
	'dialogs.cy.ts': 40,
	'field.a11y.cy.ts': 15,
	'floating-content.a11y.cy.ts': 79,
	'form-choices.a11y.cy.ts': 78,
	'grouped-actions.cy.ts': 36,
	'identity-items.cy.ts': 57,
	'input.a11y.cy.ts': 11,
	'label.a11y.cy.ts': 7,
	'loading.a11y.cy.ts': 18,
	'messages.cy.ts': 25,
	'search-choices.cy.ts': 298,
	'selection.a11y.cy.ts': 55,
	'sidebar.cy.ts': 22,
	'slider.a11y.cy.ts': 36,
	'sonner.cy.ts': 78,
	'space.a11y.cy.ts': 46,
	'tables-pagination.cy.ts': 65,
	'textarea.a11y.cy.ts': 9,
	'visual-containers.a11y.cy.ts': 63,
};
export const unknownDuration = 60;

/** Pushes to main/develop and changes to the CI itself run every e2e project; PRs run affected ones. */
export function fullE2E(eventName, changedFiles) {
	return eventName !== 'pull_request' || changedFiles.some((file) => /^(\.github\/|tools\/ci\/)/.test(file));
}

/** Parses a `<index>/<total>` shard, 1-based. */
export function parseShard(shard) {
	const match = /^(\d+)\/(\d+)$/.exec(shard ?? '1/1');
	const index = Number(match?.[1]),
		total = Number(match?.[2]);
	if (!match || index < 1 || index > total) throw new Error(`Invalid shard "${shard}"; expected <index>/<total>.`);
	return { index, total };
}

/**
 * Deterministic longest-first balancing: each spec, slowest first, goes to the least loaded shard.
 * Every spec lands in exactly one shard, so the shards together always cover the whole suite.
 */
export function shardSpecs(specs, { index, total }, known = durations) {
	const loads = Array.from({ length: total }, () => ({ seconds: 0, specs: [] }));
	const weight = (spec) => known[spec.split('/').at(-1)] ?? unknownDuration;
	for (const spec of [...specs].sort((a, b) => weight(b) - weight(a) || a.localeCompare(b))) {
		const lightest = loads.reduce((best, load) => (load.seconds < best.seconds ? load : best));
		lightest.seconds += weight(spec);
		lightest.specs.push(spec);
	}
	return loads[index - 1].specs.sort();
}
