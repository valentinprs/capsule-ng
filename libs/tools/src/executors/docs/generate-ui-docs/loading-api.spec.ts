import { readJson, workspaceRoot } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { extractPrimitiveCodeGenerator } from '../../../generators/generate-primitive-snippets/generator';
import type { NestedStructure } from './executor';

function loadingApi(family: string) {
	const generated = JSON.parse(
		readFileSync(join(workspaceRoot, `dist/extracted-metadata/ui-api/${family}.json`), 'utf8'),
	) as NestedStructure;
	return generated[family]['caps'];
}

describe('Capsule loading public documentation', () => {
	it('documents only the three public loading components and their Spartan inputs', () => {
		const spinner = loadingApi('spinner');
		expect(Object.keys(spinner)).toEqual(['CapsSpinner']);
		expect(spinner['CapsSpinner'].selector).toBe('caps-spinner');
		expect(spinner['CapsSpinner'].inputs.map(({ name }) => name)).toEqual(['icon', 'aria-label', 'aria-hidden']);
		expect(spinner['CapsSpinner'].inputs).toContainEqual(expect.objectContaining({ name: 'icon', type: 'string' }));
		const skeleton = loadingApi('skeleton');
		expect(Object.keys(skeleton)).toEqual(['CapsSkeleton']);
		expect(skeleton['CapsSkeleton'].selector).toBe('caps-skeleton');
		expect(skeleton['CapsSkeleton'].inputs).toEqual([]);
		const progress = loadingApi('progress');
		expect(Object.keys(progress)).toEqual(['CapsProgress']);
		expect(progress['CapsProgress'].selector).toBe('caps-progress');
		expect(progress['CapsProgress'].inputs.map(({ name }) => name)).toEqual(['value', 'max', 'getValueLabel']);
		expect(progress['CapsProgress'].inputs).toContainEqual(
			expect.objectContaining({ name: 'value', type: 'number | null | undefined' }),
		);
		for (const component of [spinner['CapsSpinner'], skeleton['CapsSkeleton'], progress['CapsProgress']]) {
			expect(component.outputs).toEqual([]);
			expect(component.models).toEqual([]);
		}
	});
	it('serves every family snippet through Capsule public entrypoints', async () => {
		const counts = { spinner: 10, skeleton: 7, progress: 3 };
		const tree = createTreeWithEmptyWorkspace();
		const outputDirectory = 'apps/app/src/public/data/primitives-snippets';
		for (const family of Object.keys(counts)) {
			const sourceDirectory = `apps/app/src/app/pages/(components)/components/(${family})`;
			for (const file of readdirSync(join(workspaceRoot, sourceDirectory)).sort()) {
				if (!file.endsWith('.preview.ts') && !file.endsWith('.example.ts')) continue;
				tree.write(join(sourceDirectory, file), readFileSync(join(workspaceRoot, sourceDirectory, file), 'utf8'));
			}
			// Unit tests run before the app build: generate from tracked sources, never ignored assets.
			expect(tree.exists(join(outputDirectory, `${family}.json`))).toBe(false);
		}
		await extractPrimitiveCodeGenerator(tree);
		for (const [family, count] of Object.entries(counts)) {
			const data = readJson(tree, join(outputDirectory, `${family}.json`));
			const entries = data[family] as Record<string, string>;
			const snippets = Object.entries(entries)
				.filter(([name]) => name !== 'defaultSource')
				.map(([name, code]) => (name === 'default' ? (entries['defaultSource'] ?? code) : code));
			expect(snippets).toHaveLength(count);
			for (const snippet of snippets) {
				expect(snippet).toContain(`@capsule-ng/caps/${family}`);
				expect(snippet).not.toMatch(/Hlm(?:Spinner|Skeleton|Progress)|hlm-(?:spinner|skeleton|progress)/);
			}
		}
	});
});
