import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmFieldImports } from '@spartan-ng/helm/field';

@Component({
	selector: 'spartan-input-field',
	imports: [CapsInputImports, HlmFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<hlm-field>
			<label hlmFieldLabel for="input-field-username">Username</label>
			<input capsInput id="input-field-username" type="text" placeholder="Enter your username" />
			<hlm-field-description>Choose a unique username for your account.</hlm-field-description>
		</hlm-field>
	`,
})
export class InputField {}
