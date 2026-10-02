import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-input-field-group',
	imports: [CapsInputImports, CapsFieldImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field-group>
			<caps-field>
				<caps-field-label for="fieldgroup-name">Name</caps-field-label>
				<input capsInput id="fieldgroup-name" placeholder="Leonidas" />
			</caps-field>
			<caps-field>
				<caps-field-label for="fieldgroup-email">Email</caps-field-label>
				<input capsInput id="fieldgroup-email" type="email" placeholder="name@example.com" />
				<caps-field-description>We'll send updates to this address.</caps-field-description>
			</caps-field>
			<caps-field orientation="horizontal">
				<button capsButton variant="outline" type="reset">Reset</button>
				<button capsButton type="submit">Submit</button>
			</caps-field>
		</caps-field-group>
	`,
})
export class InputFieldGroup {}
