import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideEllipsis } from '@ng-icons/lucide';

import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';

@Component({
	selector: 'spartan-input-group-dropdown-preview',
	imports: [CapsButtonImports, CapsInputImports, CapsInputGroupImports, CapsDropdownMenuImports, NgIcon],
	providers: [provideIcons({ lucideEllipsis, lucideChevronDown })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'grid w-full max-w-sm gap-6' },
	template: `
		<caps-input-group>
			<input capsInput placeholder="Enter file name" aria-label="Enter file name" />

			<caps-input-group-addon align="inline-end">
				<button
					capsButton
					variant="ghost"
					aria-label="More"
					size="icon-xs"
					[capsDropdownMenuTrigger]="fileMenu"
					type="button"
					placement="bottom-end"
				>
					<ng-icon name="lucideEllipsis" />
				</button>
			</caps-input-group-addon>
		</caps-input-group>
		<caps-input-group class="[--radius:1rem]">
			<input capsInput placeholder="Enter search query" aria-label="Enter search query" />

			<caps-input-group-addon align="inline-end">
				<button
					capsButton
					variant="ghost"
					class="pe-1.5! text-xs"
					[capsDropdownMenuTrigger]="searchMenu"
					size="xs"
					type="button"
					placement="bottom-end"
				>
					Search In...
					<ng-icon name="lucideChevronDown" />
				</button>
			</caps-input-group-addon>
		</caps-input-group>

		<ng-template #fileMenu>
			<caps-menu class="w-48">
				<button capsMenuItem>Settings</button>
				<button capsMenuItem>Copy path</button>
				<button capsMenuItem>Open location</button>
			</caps-menu>
		</ng-template>

		<ng-template #searchMenu>
			<caps-menu class="w-56 [--radius:0.95rem]">
				<button capsMenuItem>Documentation</button>
				<button capsMenuItem>Blog Posts</button>
				<button capsMenuItem>Changelog</button>
			</caps-menu>
		</ng-template>
	`,
})
export class InputGroupDropdownPreview {}
