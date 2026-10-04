import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { HlmKbdImports } from '@spartan-ng/helm/kbd';

@Component({
	selector: 'spartan-input-group-kbd',
	imports: [CapsInputImports, CapsInputGroupImports, NgIcon, HlmKbdImports],
	providers: [provideIcons({ lucideSearch })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'max-w-sm' },
	template: `
		<caps-input-group>
			<input capsInput placeholder="Search..." aria-label="Search" />
			<caps-input-group-addon>
				<ng-icon name="lucideSearch" />
			</caps-input-group-addon>
			<caps-input-group-addon align="inline-end">
				<kbd hlmKbd>⌘K</kbd>
			</caps-input-group-addon>
		</caps-input-group>
	`,
})
export class InputGroupKbd {}
