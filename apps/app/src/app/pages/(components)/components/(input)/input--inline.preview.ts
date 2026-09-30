import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
	selector: 'spartan-input-inline',
	imports: [CapsInputImports, CapsFieldImports, HlmButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field orientation="horizontal">
			<input capsInput aria-label="Search" type="search" placeholder="Search..." />
			<button hlmBtn>Search</button>
		</caps-field>
	`,
})
export class InputInline {}
