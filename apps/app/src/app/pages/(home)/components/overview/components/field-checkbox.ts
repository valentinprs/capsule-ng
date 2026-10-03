import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCheckbox } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-field-checkbox',
	imports: [CapsFieldImports, CapsCheckbox],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field-set>
			<caps-field-label for="exp-checkbox">
				<caps-field orientation="horizontal">
					<caps-checkbox id="exp-checkbox" [checked]="true" />
					<caps-field-label for="exp-checkbox">I agree to the terms and conditions</caps-field-label>
				</caps-field>
			</caps-field-label>
		</caps-field-set>
	`,
})
export class FieldCheckbox {}
