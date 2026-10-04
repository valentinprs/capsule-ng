import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLink2 } from '@ng-icons/lucide';

import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsLabelImports } from '@capsule-ng/caps/label';

@Component({
	selector: 'spartan-input-group-button-group-preview',
	imports: [CapsInputImports, CapsInputGroupImports, CapsButtonGroupImports, CapsLabelImports, NgIcon],
	providers: [provideIcons({ lucideLink2 })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'grid w-full max-w-sm gap-6' },
	template: `
		<caps-button-group aria-label="Actions">
			<caps-button-group-text>
				<label capsLabel for="url">https://</label>
			</caps-button-group-text>
			<caps-input-group>
				<input capsInput id="url" />
				<caps-input-group-addon align="inline-end">
					<ng-icon name="lucideLink2" />
				</caps-input-group-addon>
			</caps-input-group>
			<caps-button-group-text>.com</caps-button-group-text>
		</caps-button-group>
	`,
})
export class InputGroupButtonGroupPreview {}
