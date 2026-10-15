import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLoader } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-input-group-spinner-preview',
	imports: [CapsInputImports, CapsInputGroupImports, NgIcon, CapsSpinnerImports],
	providers: [provideIcons({ lucideLoader })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'grid w-full max-w-sm gap-6' },
	template: `
		<caps-input-group>
			<input capsInput placeholder="Searching..." aria-label="Searching" />
			<caps-input-group-addon align="inline-end">
				<caps-spinner aria-hidden="true" />
			</caps-input-group-addon>
		</caps-input-group>

		<caps-input-group>
			<input capsInput placeholder="Processing..." aria-label="Processing" />
			<caps-input-group-addon>
				<caps-spinner aria-hidden="true" />
			</caps-input-group-addon>
		</caps-input-group>

		<caps-input-group>
			<input capsInput placeholder="Saving changes..." aria-label="Saving changes" />
			<caps-input-group-addon align="inline-end">
				<caps-input-group-text>Saving...</caps-input-group-text>
				<caps-spinner aria-hidden="true" />
			</caps-input-group-addon>
		</caps-input-group>

		<caps-input-group>
			<input capsInput placeholder="Refreshing data..." aria-label="Refreshing data" />
			<caps-input-group-addon>
				<ng-icon name="lucideLoader" class="motion-safe:animate-spin" />
			</caps-input-group-addon>

			<caps-input-group-addon align="inline-end">
				<caps-input-group-text>Please wait...</caps-input-group-text>
			</caps-input-group-addon>
		</caps-input-group>
	`,
})
export class InputGroupSpinnerPreview {}
