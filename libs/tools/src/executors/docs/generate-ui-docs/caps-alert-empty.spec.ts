import { workspaceRoot } from '@nx/devkit';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { NestedStructure } from './executor';

describe('Alert and Empty public API metadata', () => {
	it('documents Spartan variants and the complete projected Alert anatomy', () => {
		const docs = JSON.parse(
			readFileSync(join(workspaceRoot, 'dist/extracted-metadata/ui-api/alert.json'), 'utf8'),
		) as NestedStructure;
		const caps = docs['alert']['caps'];
		expect(Object.keys(caps).sort()).toEqual([
			'CapsAlert',
			'CapsAlertActions',
			'CapsAlertDescription',
			'CapsAlertMedia',
			'CapsAlertTitle',
		]);
		expect(caps['CapsAlert'].selector).toBe('caps-alert');
		expect(caps['CapsAlert'].inputs).toEqual([
			expect.objectContaining({ name: 'variant', type: "CapsAlertVariants['variant']", defaultValue: "'default'" }),
		]);
		expect(caps['CapsAlert'].outputs).toEqual([]);
		expect(caps['CapsAlertTitle'].inputs).toEqual([]);
	});
	it('documents direct Empty anatomy, optional grouping and retained media variants without a fabricated data API', () => {
		const docs = JSON.parse(
			readFileSync(join(workspaceRoot, 'dist/extracted-metadata/ui-api/empty.json'), 'utf8'),
		) as NestedStructure;
		const caps = docs['empty']['caps'];
		expect(Object.keys(caps).sort()).toEqual([
			'CapsEmpty',
			'CapsEmptyActions',
			'CapsEmptyContent',
			'CapsEmptyDescription',
			'CapsEmptyHeader',
			'CapsEmptyMedia',
			'CapsEmptyTitle',
		]);
		expect(caps['CapsEmpty'].selector).toBe('caps-empty');
		expect(caps['CapsEmpty'].inputs).toEqual([]);
		expect(caps['CapsEmpty'].outputs).toEqual([]);
		expect(caps['CapsEmptyMedia'].inputs).toEqual([
			expect.objectContaining({ name: 'variant', type: "CapsEmptyMediaVariants['variant']", defaultValue: null }),
		]);
		expect(caps['CapsEmptyTitle'].inputs).toEqual([]);
	});
});
