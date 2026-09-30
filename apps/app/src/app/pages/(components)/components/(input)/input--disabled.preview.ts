import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmFieldImports } from '@spartan-ng/helm/field';

@Component({
	selector: 'spartan-input-disabled',
	imports: [CapsInputImports, HlmFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<hlm-field data-disabled="true">
			<label hlmFieldLabel for="input-demo-disabled">Email</label>
			<input capsInput id="input-demo-disabled" type="email" placeholder="Email" disabled />
			<hlm-field-description>This field is currently disabled.</hlm-field-description>
		</hlm-field>
	`,
})
export class InputDisabledPreview {}
