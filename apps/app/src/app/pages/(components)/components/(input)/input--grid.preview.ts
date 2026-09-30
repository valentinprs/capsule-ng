import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmFieldImports } from '@spartan-ng/helm/field';

@Component({
	selector: 'spartan-input-grid',
	imports: [CapsInputImports, HlmFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<hlm-field-group class="grid max-w-sm grid-cols-2">
			<hlm-field>
				<label hlmFieldLabel for="first-name">First Name</label>
				<input capsInput id="first-name" placeholder="King" />
			</hlm-field>
			<hlm-field>
				<label hlmFieldLabel for="last-name">Last Name</label>
				<input capsInput id="last-name" placeholder="Leonidas" />
			</hlm-field>
		</hlm-field-group>
	`,
})
export class InputGrid {}
