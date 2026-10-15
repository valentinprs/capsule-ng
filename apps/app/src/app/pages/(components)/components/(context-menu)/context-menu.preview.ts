import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsContextMenuImports } from '@capsule-ng/caps/context-menu';

@Component({
	selector: 'spartan-context-menu-preview',
	imports: [CapsContextMenuImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div
			[capsContextMenuTrigger]="menu"
			align="start"
			side="right"
			class="flex aspect-video w-full min-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
			tabindex="0"
		>
			<span class="hidden pointer-fine:inline-block">Right click here</span>
			<span class="hidden pointer-coarse:inline-block">Long press here</span>
		</div>

		<ng-template #menu>
			<caps-menu class="w-64">
				<caps-menu-group>
					<button capsMenuItem>
						Back
						<caps-menu-shortcut>⌘[</caps-menu-shortcut>
					</button>
					<button capsMenuItem disabled>
						Forward
						<caps-menu-shortcut>⌘]</caps-menu-shortcut>
					</button>
					<button capsMenuItem>
						Reload
						<caps-menu-shortcut>⌘R</caps-menu-shortcut>
					</button>
					<button [capsMenuSubTrigger]="moreTools" align="start" side="right">More Tools</button>
				</caps-menu-group>
				<caps-menu-separator />
				<caps-menu-group>
					<button capsMenuCheckboxItem [checked]="true">Show Bookmarks Bar</button>
					<button capsMenuCheckboxItem>Show full URLs</button>
				</caps-menu-group>
				<caps-menu-separator />
				<caps-menu-group label="People">
					<button capsMenuRadioItem [checked]="true">Pedro Duarte</button>
					<button capsMenuRadioItem>Colm Tuite</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>

		<ng-template #moreTools>
			<caps-menu class="w-44">
				<caps-menu-group>
					<button capsMenuItem>Save Page...</button>
					<button capsMenuItem>Create Shortcut...</button>
					<button capsMenuItem>Name Window...</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem>Developer Tools</button>
				<caps-menu-separator />
				<button capsMenuItem danger>Delete</button>
			</caps-menu>
		</ng-template>
	`,
})
export class ContextMenuPreview {}

export const defaultImports = `
import { CapsContextMenuImports } from '@capsule-ng/caps/context-menu';
`;

export const defaultSkeleton = `
<div [capsContextMenuTrigger]="menu" tabindex="0">Right click here</div>

<ng-template #menu>
  <caps-menu>
    <caps-menu-group>
      <button capsMenuItem>Profile</button>
      <button capsMenuItem>Billing</button>
      <button capsMenuItem>Team</button>
      <button capsMenuItem>Subscription</button>
    </caps-menu-group>
  </caps-menu>
</ng-template>
`;
