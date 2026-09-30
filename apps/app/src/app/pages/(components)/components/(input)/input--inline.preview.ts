import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmFieldImports } from '@spartan-ng/helm/field';

@Component({
	selector: 'spartan-input-inline',
	imports: [CapsInputImports, HlmFieldImports, HlmButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<hlm-field orientation="horizontal">
			<input capsInput aria-label="Search" type="search" placeholder="Search..." />
			<button hlmBtn>Search</button>
		</hlm-field>
	`,
})
export class InputInline {}
