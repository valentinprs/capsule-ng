import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsCollapsibleImports } from '@capsule-ng/caps/collapsible';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight, lucideFile, lucideFolder } from '@ng-icons/lucide';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';

type FileTreeItem = { name: string; items?: FileTreeItem[] };

const FILE_TREE: FileTreeItem[] = [
	{
		name: 'components',
		items: [
			{
				name: 'ui',
				items: [
					{ name: 'button.ts' },
					{ name: 'card.ts' },
					{ name: 'dialog.ts' },
					{ name: 'input.ts' },
					{ name: 'select.ts' },
					{ name: 'table.ts' },
				],
			},
			{ name: 'login-form.ts' },
			{ name: 'register-form.ts' },
		],
	},
	{
		name: 'lib',
		items: [{ name: 'utils.ts' }, { name: 'cn.ts' }, { name: 'api.ts' }],
	},
	{
		name: 'services',
		items: [{ name: 'media-query.ts' }, { name: 'auth.ts' }, { name: 'local-storage.ts' }],
	},
	{
		name: 'types',
		items: [{ name: 'index.d.ts' }, { name: 'api.d.ts' }],
	},
	{
		name: 'public',
		items: [{ name: 'favicon.ico' }, { name: 'logo.svg' }, { name: 'images' }],
	},
	{ name: 'app.ts' },
	{ name: 'layout.ts' },
	{ name: 'globals.css' },
	{ name: 'package.json' },
	{ name: 'tsconfig.json' },
	{ name: 'README.md' },
	{ name: '.gitignore' },
];

@Component({
	selector: 'spartan-file-tree-node',
	imports: [CapsCollapsibleImports, CapsButtonImports, NgIcon, FileTreeNode],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		@if (item().items; as children) {
			<caps-collapsible class="w-full">
				<button
					capsCollapsibleTrigger
					capsButton
					variant="ghost"
					size="sm"
					class="group hover:bg-accent hover:text-accent-foreground w-full justify-start transition-none"
				>
					<ng-icon name="lucideChevronRight" class="transition-transform group-data-[state=open]:rotate-90" />
					<ng-icon name="lucideFolder" />
					{{ item().name }}
				</button>
				<caps-collapsible-content class="ms-5 mt-1 flex flex-col gap-1">
					@for (child of children; track child.name) {
						<spartan-file-tree-node [item]="child" />
					}
				</caps-collapsible-content>
			</caps-collapsible>
		} @else {
			<button capsButton variant="link" size="sm" class="text-foreground w-full justify-start gap-2">
				<ng-icon name="lucideFile" />
				<span>{{ item().name }}</span>
			</button>
		}
	`,
})
export class FileTreeNode {
	public readonly item = input.required<FileTreeItem>();
}

@Component({
	selector: 'spartan-collapsible-file-tree',
	imports: [CapsCollapsibleImports, CapsButtonImports, CapsCardImports, HlmTabsImports, FileTreeNode],
	providers: [provideIcons({ lucideChevronRight, lucideFile, lucideFolder })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'mx-auto w-full max-w-xs' },
	template: `
		<caps-card density="compact">
			<caps-card-header>
				<hlm-tabs tab="explorer">
					<hlm-tabs-list class="w-full">
						<button hlmTabsTrigger="explorer">Explorer</button>
						<button hlmTabsTrigger="outline">Outline</button>
					</hlm-tabs-list>
				</hlm-tabs>
			</caps-card-header>
			<caps-card-content>
				<div class="flex flex-col gap-1">
					@for (item of fileTree; track item.name) {
						<spartan-file-tree-node [item]="item" />
					}
				</div>
			</caps-card-content>
		</caps-card>
	`,
})
export class CollapsibleFileTree {
	public readonly fileTree = FILE_TREE;
}
