import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-input-input-group',
	imports: [CapsInputImports, CapsFieldImports, CapsInputGroupImports, NgIcon],
	providers: [provideIcons({ lucideInfo })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field>
			<caps-field-label for="input-group-url">Website URL</caps-field-label>
			<caps-input-group>
				<input capsInput id="input-group-url" placeholder="example.com" />
				<caps-input-group-addon>
					<caps-input-group-text>https://</caps-input-group-text>
				</caps-input-group-addon>
				<caps-input-group-addon align="inline-end">
					<ng-icon name="lucideInfo" />
				</caps-input-group-addon>
			</caps-input-group>
		</caps-field>
	`,
})
export class InputInputGroup {}
