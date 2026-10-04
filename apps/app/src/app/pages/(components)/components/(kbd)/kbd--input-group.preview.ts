import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { HlmKbdImports } from '@spartan-ng/helm/kbd';

@Component({
	selector: 'spartan-kbd-input-group-preview',
	imports: [CapsInputImports, HlmKbdImports, CapsInputGroupImports, NgIcon],
	providers: [provideIcons({ lucideSearch })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex w-full max-w-xs flex-col gap-6">
			<caps-input-group>
				<input capsInput placeholder="Search..." aria-label="Search" />
				<caps-input-group-addon>
					<ng-icon name="lucideSearch" />
				</caps-input-group-addon>
				<caps-input-group-addon align="inline-end">
					<kbd hlmKbd>⌘</kbd>
					<kbd hlmKbd>K</kbd>
				</caps-input-group-addon>
			</caps-input-group>
		</div>
	`,
})
export class KbdInputGroupPreview {}
