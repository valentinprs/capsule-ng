import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsHeaderImports } from '@capsule-ng/caps/header';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMoon } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-header-minimal-preview',
	imports: [CapsHeaderImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideMoon })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full' },
	template: `
		<caps-header>
			<caps-header-title>MyHandover</caps-header-title>
			<caps-header-actions>
				<button capsButton variant="ghost" size="icon" type="button" aria-label="Toggle theme">
					<ng-icon name="lucideMoon" aria-hidden="true" />
				</button>
			</caps-header-actions>
		</caps-header>
	`,
})
export class HeaderMinimalPreview {}
