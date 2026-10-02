import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-input-field',
	imports: [CapsInputImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field>
			<caps-field-label for="input-field-username">Username</caps-field-label>
			<input capsInput id="input-field-username" type="text" placeholder="Enter your username" />
			<caps-field-description>Choose a unique username for your account.</caps-field-description>
		</caps-field>
	`,
})
export class InputField {}
