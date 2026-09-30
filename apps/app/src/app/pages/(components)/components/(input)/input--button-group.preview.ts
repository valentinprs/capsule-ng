import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmFieldImports } from '@spartan-ng/helm/field';

@Component({
	selector: 'spartan-input-button-group',
	imports: [CapsInputImports, HlmFieldImports, HlmButtonGroupImports, HlmButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<hlm-field>
			<label hlmFieldLabel for="input-button-group">Search</label>
			<hlm-button-group>
				<input capsInput id="input-button-group" placeholder="Type to search..." />
				<button hlmBtn variant="outline">Search</button>
			</hlm-button-group>
		</hlm-field>
	`,
})
export class InputButtonGroup {}
