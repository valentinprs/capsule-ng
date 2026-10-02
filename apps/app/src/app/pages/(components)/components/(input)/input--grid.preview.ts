import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-input-grid',
	imports: [CapsInputImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field-group class="grid max-w-sm grid-cols-2">
			<caps-field>
				<caps-field-label for="first-name">First Name</caps-field-label>
				<input capsInput id="first-name" placeholder="King" />
			</caps-field>
			<caps-field>
				<caps-field-label for="last-name">Last Name</caps-field-label>
				<input capsInput id="last-name" placeholder="Leonidas" />
			</caps-field>
		</caps-field-group>
	`,
})
export class InputGrid {}
