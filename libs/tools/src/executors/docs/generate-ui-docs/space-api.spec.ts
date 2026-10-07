import { readJson, workspaceRoot } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { extractPrimitiveCodeGenerator } from '../../../generators/generate-primitive-snippets/generator';
import type { NestedStructure } from './executor';
const root = workspaceRoot;
function api(slug: string) {
	return JSON.parse(
		readFileSync(join(root, 'dist/extracted-metadata/ui-api', slug + '.json'), 'utf8'),
	) as NestedStructure;
}
it('documents the installed ScrollArea modes and Capsule viewport naming API', () => {
	const entry = api('scroll-area')['scroll-area']['caps']['CapsScrollArea'];
	expect(entry.selector).toBe('caps-scroll-area');
	expect(entry.inputs.map((i) => i.name)).toEqual(
		expect.arrayContaining([
			'orientation',
			'visibility',
			'appearance',
			'position',
			'aria-label',
			'aria-labelledby',
			'aria-describedby',
			'tabindex',
			'withButtons',
			'disableInteraction',
			'disableSensor',
		]),
	);
	expect(entry.outputs.map((i) => i.name)).toEqual(expect.arrayContaining(['afterInit', 'afterUpdate']));
});
it('documents percentage layout and panel/handle contracts through public exported Brain ancestry', () => {
	const family = api('resizable')['resizable']['caps'];
	expect(Object.keys(family).sort()).toEqual(['CapsResizableGroup', 'CapsResizableHandle', 'CapsResizablePanel']);
	expect(family['CapsResizableGroup'].models.map((i) => i.name)).toContain('layout');
	expect(family['CapsResizablePanel'].inputs.map((i) => i.name)).toEqual(
		expect.arrayContaining(['id', 'defaultSize', 'minSize', 'maxSize', 'collapsible']),
	);
	expect(family['CapsResizableHandle'].inputs.map((i) => i.name)).toEqual(
		expect.arrayContaining(['withHandle', 'disabled']),
	);
});
it('serves all eight previews as public Capsule snippets without consumer-owned viewport or obsolete Helm anatomy', async () => {
	const tree = createTreeWithEmptyWorkspace();
	const families = [
		['scroll-area', 3],
		['resizable', 5],
	] as const;
	for (const [slug] of families) {
		const sourceDir = `apps/app/src/app/pages/(components)/components/(${slug})`;
		for (const filename of readdirSync(join(root, sourceDir)).sort()) {
			if (!filename.endsWith('.preview.ts') && !filename.endsWith('.example.ts')) continue;
			const sourcePath = join(sourceDir, filename);
			tree.write(sourcePath, readFileSync(join(root, sourcePath), 'utf8'));
		}
		expect(tree.exists(`apps/app/src/public/data/primitives-snippets/${slug}.json`)).toBe(false);
	}
	await extractPrimitiveCodeGenerator(tree);
	for (const [slug, count] of families) {
		const snippets = readJson(tree, `apps/app/src/public/data/primitives-snippets/${slug}.json`)[slug] as Record<
			string,
			string
		>;
		expect(Object.keys(snippets).filter((k) => k !== 'defaultSource')).toHaveLength(count);
		for (const source of Object.values(snippets)) {
			expect(source).toMatch(/caps-(scroll-area|resizable)/);
			expect(source).not.toMatch(
				/@spartan-ng\/(helm|brain)\/(scroll-area|resizable)|hlm-resizable|ng-scrollbar|scrollViewport/,
			);
		}
	}
});
