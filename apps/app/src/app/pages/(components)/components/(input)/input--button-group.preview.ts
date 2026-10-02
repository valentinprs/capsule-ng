import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';

@Component({
	selector: 'spartan-input-button-group',
	imports: [CapsInputImports, CapsFieldImports, HlmButtonGroupImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field>
			<caps-field-label for="input-button-group">Search</caps-field-label>
			<hlm-button-group>
				<input capsInput id="input-button-group" placeholder="Type to search..." />
				<button capsButton variant="outline">Search</button>
			</hlm-button-group>
		</caps-field>
	`,
})
export class InputButtonGroup {}
