import { workspaceRoot } from '@nx/devkit';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Project } from 'ts-morph';
import { describe, expect, it } from 'vitest';
import { extractInputsOutputs } from './executor';

describe('NavigationMenu public Capsule API', () => {
	it('documents public selectors and inherited contracts while keeping the panel adapter private', () => {
		const project = new Project({
			tsConfigFilePath: join(workspaceRoot, 'tsconfig.base.json'),
			skipAddingFilesFromTsConfig: true,
		});
		project.addSourceFilesAtPaths(join(workspaceRoot, 'libs/caps/navigation-menu/src/lib/*.ts'));
		const api = extractInputsOutputs(project, workspaceRoot)['navigation-menu']['caps'];
		expect(Object.keys(api).sort()).toEqual([
			'CapsNavigationMenu',
			'CapsNavigationMenuContent',
			'CapsNavigationMenuItem',
			'CapsNavigationMenuLink',
			'CapsNavigationMenuTrigger',
		]);
		expect(api['CapsNavigationMenu'].selector).toBe('caps-navigation-menu');
		expect(api['CapsNavigationMenu'].inputs.map((input) => input.name)).toEqual(
			expect.arrayContaining(['aria-label', 'openOn', 'orientation', 'delayDuration', 'skipDelayDuration']),
		);
		// The repository generator flattens a composed model into its input and output.
		expect(api['CapsNavigationMenu'].inputs.map((input) => input.name)).toContain('value');
		expect(api['CapsNavigationMenu'].outputs.map((output) => output.name)).toContain('valueChange');
		expect(api['CapsNavigationMenuItem'].selector).toBe('li[capsNavigationMenuItem]');
		expect(api['CapsNavigationMenuLink'].inputs.map((input) => input.name)).toEqual(
			expect.arrayContaining(['active', 'disabled']),
		);
		expect(api['CapsNavigationMenuTrigger'].inputs.map((input) => input.name)).toEqual(
			expect.arrayContaining(['align', 'disabled']),
		);
		expect(api['CapsNavigationMenuContent'].inputs.map((input) => input.name)).toContain('class');
	});
	it('keeps all example sources and displayed usage on the public entrypoint', () => {
		const base = 'apps/app/src/app/pages/(components)/components/(navigation-menu)';
		for (const name of [
			'navigation-menu.preview.ts',
			'navigation-menu--align.preview.ts',
			'navigation-menu--controlled.example.ts',
			'navigation-menu--nested.example.ts',
			'navigation-menu--open-on-click.example.ts',
			'navigation-menu--rtl.example.ts',
			'navigation-menu--vertical.example.ts',
		]) {
			const source = readFileSync(join(workspaceRoot, base, name), 'utf8');
			expect(source, name).toContain('@capsule-ng/caps/navigation-menu');
			expect(source, name).not.toMatch(/hlmNavigationMenu|brnNavigationMenu|hlm-navigation-menu|isCurrentPage/);
		}
		expect(
			readFileSync(join(workspaceRoot, 'apps/ui-storybook/stories/navigation-menu.stories.ts'), 'utf8'),
		).not.toMatch(/hlmNavigationMenu|brnNavigationMenu|hlm-navigation-menu|isCurrentPage/);
	});
});
