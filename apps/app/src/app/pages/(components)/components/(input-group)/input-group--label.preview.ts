import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo } from '@ng-icons/lucide';

import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsLabelImports } from '@capsule-ng/caps/label';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';

@Component({
	selector: 'spartan-input-group-label-preview',
	imports: [CapsButtonImports, CapsInputImports, CapsInputGroupImports, CapsTooltipImports, CapsLabelImports, NgIcon],
	providers: [provideIcons({ lucideInfo })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'grid w-full max-w-sm gap-6' },
	template: `
		<caps-input-group>
			<input capsInput id="email" placeholder="spartan" />
			<caps-input-group-addon>
				<label for="email" capsLabel>&#64;</label>
			</caps-input-group-addon>
		</caps-input-group>

		<caps-input-group>
			<input capsInput id="email-2" placeholder="spartan-ng@github.com" />
			<caps-input-group-addon align="block-start">
				<label for="email-2" class="text-foreground" capsLabel>Email</label>
				<button
					capsButton
					[capsTooltip]="tooltip"
					variant="ghost"
					aria-label="Help"
					class="ml-auto rounded-full"
					size="icon-xs"
					type="button"
				>
					<ng-icon name="lucideInfo" />
				</button>
				<ng-template #tooltip>We'll use this to send you notifications</ng-template>
			</caps-input-group-addon>
		</caps-input-group>
	`,
})
export class InputGroupLabelPreview {}
