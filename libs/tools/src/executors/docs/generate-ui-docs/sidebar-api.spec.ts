import { workspaceRoot } from '@nx/devkit';
import { join } from 'node:path';
import { Project } from 'ts-morph';
import { describe, expect, it } from 'vitest';
import { extractInputsOutputs } from './executor';

describe('Sidebar public Capsule API', () => {
	it('documents width-only wrapper, native controls and full structural anatomy', () => {
		const project = new Project({
			tsConfigFilePath: join(workspaceRoot, 'tsconfig.base.json'),
			skipAddingFilesFromTsConfig: true,
		});
		project.addSourceFilesAtPaths(join(workspaceRoot, 'libs/caps/sidebar/src/lib/*.ts'));
		const api = extractInputsOutputs(project, workspaceRoot)['sidebar']['caps'];
		expect(Object.keys(api)).toHaveLength(24);
		expect(api['CapsSidebarWrapper'].inputs.map((input) => input.name).sort()).toEqual([
			'sidebarWidth',
			'sidebarWidthIcon',
		]);
		expect(api['CapsSidebarWrapper'].outputs).toEqual([]);
		expect(api['CapsSidebarWrapper'].models).toEqual([]);
		expect(api['CapsSidebar'].inputs.map((input) => input.name)).toEqual(
			expect.arrayContaining([
				'side',
				'variant',
				'collapsible',
				'sidebarWidthMobile',
				'srOnlySheetTitle',
				'srOnlySheetDescription',
				'sidebarContainerClass',
				'aria-label',
				'aria-labelledby',
			]),
		);
		expect(api['CapsSidebar'].models).toEqual([]);
		expect(api['CapsSidebarMenuButton'].selector).toBe('a[capsSidebarMenuButton],button[capsSidebarMenuButton]');
		expect(api['CapsSidebarMenuButton'].inputs.map((input) => input.name)).toEqual(
			expect.arrayContaining(['disabled', 'tooltip', 'closeMobileSidebarOnClick', 'isActive']),
		);
		expect(api['CapsSidebarMenuSubButton'].selector).toBe(
			'a[capsSidebarMenuSubButton],button[capsSidebarMenuSubButton]',
		);
		expect(api['CapsSidebarGroupLabelButton'].selector).toBe('button[capsSidebarGroupLabel]');
		expect(api['CapsSidebarTrigger'].inputs.map((input) => input.name)).toContain('disabled');
	});
});
