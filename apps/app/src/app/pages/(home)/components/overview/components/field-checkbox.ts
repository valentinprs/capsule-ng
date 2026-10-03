import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCheckbox } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-field-checkbox',
	imports: [CapsFieldImports, CapsCheckbox],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field orientation="horizontal">
			<caps-checkbox [checked]="true" />
			<caps-field-label>I agree to the terms and conditions</caps-field-label>
		</caps-field>
	`,
})
export class FieldCheckbox {}
