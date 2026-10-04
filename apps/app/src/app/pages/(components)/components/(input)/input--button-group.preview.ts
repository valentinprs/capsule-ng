import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-input-button-group',
	imports: [CapsInputImports, CapsFieldImports, CapsButtonGroupImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field>
			<caps-field-label for="input-button-group">Search</caps-field-label>
			<caps-button-group aria-label="Actions">
				<input capsInput id="input-button-group" placeholder="Type to search..." />
				<button capsButton variant="outline">Search</button>
			</caps-button-group>
		</caps-field>
	`,
})
export class InputButtonGroup {}
