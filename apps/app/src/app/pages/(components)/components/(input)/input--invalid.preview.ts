import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmFieldImports } from '@spartan-ng/helm/field';

@Component({
	selector: 'spartan-input-invalid',
	imports: [CapsInputImports, HlmFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<hlm-field forceInvalid>
			<label hlmFieldLabel for="input-invalid">Invalid Input</label>
			<input capsInput forceInvalid id="input-invalid" placeholder="Error" />
			<hlm-field-description>This field contains validation errors.</hlm-field-description>
		</hlm-field>
	`,
})
export class InputInvalid {}
