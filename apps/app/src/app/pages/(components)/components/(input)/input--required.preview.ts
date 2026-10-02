import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-input-required',
	imports: [CapsInputImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field>
			<caps-field-label for="input-required">
				Required Field
				<span class="text-destructive">*</span>
			</caps-field-label>
			<input capsInput id="input-required" required placeholder="This field is required" />
			<caps-field-description>This field must be filled out.</caps-field-description>
		</caps-field>
	`,
})
export class InputRequired {}
