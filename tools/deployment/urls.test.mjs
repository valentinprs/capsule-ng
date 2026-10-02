import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('product files cannot reintroduce upstream URLs or Algolia index', () => {
	const files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' })
		.trim()
		.split('\n');
	const exceptions = new Set([
		'apps/app/src/app/pages/(documentation)/documentation/about.page.ts',
		'apps/ui-storybook/stories/date-picker.stories.ts',
	]);
	const offenders = [];
	for (const file of files) {
		if (
			!/^(apps\/app\/|apps\/ui-storybook\/|\.github\/|libs\/trpc\/)/.test(file) ||
			exceptions.has(file) ||
			!/\.(ts|json|yml|md|html|txt)$/.test(file)
		)
			continue;
		let text;
		try {
			text = readFileSync(file, 'utf8');
		} catch {
			continue;
		}
		if (
			/https?:\/\/[^\s"'<>`]*(?:spartan\.ng|spartan-ng|goetzrobin|zerops\.io|EqHnxQ4uQr)/i.test(text) ||
			/indexName:\s*['"]spartan-ng/.test(text)
		)
			offenders.push(file);
	}
	assert.deepEqual(offenders, []);
});
