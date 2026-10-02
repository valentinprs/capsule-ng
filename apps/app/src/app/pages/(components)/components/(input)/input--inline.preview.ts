import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-input-inline',
	imports: [CapsInputImports, CapsFieldImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field orientation="horizontal">
			<input capsInput aria-label="Search" type="search" placeholder="Search..." />
			<button capsButton>Search</button>
		</caps-field>
	`,
})
export class InputInline {}
