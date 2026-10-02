import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo } from '@ng-icons/lucide';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';

@Component({
	selector: 'spartan-input-input-group',
	imports: [CapsFieldImports, HlmInputGroupImports, NgIcon],
	providers: [provideIcons({ lucideInfo })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field>
			<caps-field-label for="input-group-url">Website URL</caps-field-label>
			<hlm-input-group>
				<input hlmInputGroupInput id="input-group-url" placeholder="example.com" />
				<hlm-input-group-addon>
					<hlm-input-group-text>https://</hlm-input-group-text>
				</hlm-input-group-addon>
				<hlm-input-group-addon align="inline-end">
					<ng-icon name="lucideInfo" />
				</hlm-input-group-addon>
			</hlm-input-group>
		</caps-field>
	`,
})
export class InputInputGroup {}
