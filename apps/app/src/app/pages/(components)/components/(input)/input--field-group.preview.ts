import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
	selector: 'spartan-input-field-group',
	imports: [CapsInputImports, CapsFieldImports, HlmButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field-group>
			<caps-field>
				<label capsLabel for="fieldgroup-name">Name</label>
				<input capsInput id="fieldgroup-name" placeholder="Leonidas" />
			</caps-field>
			<caps-field>
				<label capsLabel for="fieldgroup-email">Email</label>
				<input capsInput id="fieldgroup-email" type="email" placeholder="name@example.com" />
				<caps-field-description>We'll send updates to this address.</caps-field-description>
			</caps-field>
			<caps-field orientation="horizontal">
				<button hlmBtn variant="outline" type="reset">Reset</button>
				<button hlmBtn type="submit">Submit</button>
			</caps-field>
		</caps-field-group>
	`,
})
export class InputFieldGroup {}
