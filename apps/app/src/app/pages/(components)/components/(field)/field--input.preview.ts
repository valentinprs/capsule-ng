import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-field-input-preview',
	imports: [CapsFieldImports, CapsInputImports],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<caps-field-set>
			<caps-field-group>
				<caps-field>
					<caps-field-label for="field-input-preview-firstname">Username</caps-field-label>
					<input capsInput id="field-input-preview-firstname" type="text" placeholder="Alex Cooper" />
					<caps-field-description>Choose a unique username for your account.</caps-field-description>
				</caps-field>
				<caps-field>
					<caps-field-label for="field-input-preview-password">Password</caps-field-label>
					<caps-field-description>Must be at least 8 characters long.</caps-field-description>
					<input capsInput id="field-input-preview-password" type="password" placeholder="••••••••" />
				</caps-field>
			</caps-field-group>
		</caps-field-set>
	`,
})
export class FieldInputPreview {}
