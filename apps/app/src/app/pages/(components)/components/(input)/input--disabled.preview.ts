import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-input-disabled',
	imports: [CapsInputImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field data-disabled="true">
			<label capsLabel for="input-demo-disabled">Email</label>
			<input capsInput id="input-demo-disabled" type="email" placeholder="Email" disabled />
			<caps-field-description>This field is currently disabled.</caps-field-description>
		</caps-field>
	`,
})
export class InputDisabledPreview {}
