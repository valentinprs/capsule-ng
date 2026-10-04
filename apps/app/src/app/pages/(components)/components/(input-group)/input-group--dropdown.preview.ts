import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideEllipsis } from '@ng-icons/lucide';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';

import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';

@Component({
	selector: 'spartan-input-group-dropdown-preview',
	imports: [CapsButtonImports, CapsInputImports, CapsInputGroupImports, HlmDropdownMenuImports, NgIcon],
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
					[hlmDropdownMenuTrigger]="fileMenu"
					align="end"
					type="button"
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
					[hlmDropdownMenuTrigger]="searchMenu"
					align="end"
					size="xs"
					type="button"
				>
					Search In...
					<ng-icon name="lucideChevronDown" />
				</button>
			</caps-input-group-addon>
		</caps-input-group>

		<ng-template #fileMenu>
			<hlm-dropdown-menu class="w-48">
				<button hlmDropdownMenuItem>Settings</button>
				<button hlmDropdownMenuItem>Copy path</button>
				<button hlmDropdownMenuItem>Open location</button>
			</hlm-dropdown-menu>
		</ng-template>

		<ng-template #searchMenu>
			<hlm-dropdown-menu class="w-56 [--radius:0.95rem]">
				<button hlmDropdownMenuItem>Documentation</button>
				<button hlmDropdownMenuItem>Blog Posts</button>
				<button hlmDropdownMenuItem>Changelog</button>
			</hlm-dropdown-menu>
		</ng-template>
	`,
})
export class InputGroupDropdownPreview {}
