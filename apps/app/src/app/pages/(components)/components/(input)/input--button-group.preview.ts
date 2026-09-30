import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';

@Component({
	selector: 'spartan-input-button-group',
	imports: [CapsInputImports, CapsFieldImports, HlmButtonGroupImports, HlmButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field>
			<label capsLabel for="input-button-group">Search</label>
			<hlm-button-group>
				<input capsInput id="input-button-group" placeholder="Type to search..." />
				<button hlmBtn variant="outline">Search</button>
			</hlm-button-group>
		</caps-field>
	`,
})
export class InputButtonGroup {}
