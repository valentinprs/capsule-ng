import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-input-invalid',
	imports: [CapsInputImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field forceInvalid>
			<caps-field-label for="input-invalid">Invalid Input</caps-field-label>
			<input capsInput forceInvalid id="input-invalid" placeholder="Error" />
			<caps-field-description>This field contains validation errors.</caps-field-description>
		</caps-field>
	`,
})
export class InputInvalid {}
