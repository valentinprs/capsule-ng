import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo } from '@ng-icons/lucide';

import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsLabelImports } from '@capsule-ng/caps/label';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';

@Component({
	selector: 'spartan-input-group-form-preview',
	imports: [
		CapsButtonImports,
		CapsInputImports,
		FormRoot,
		FormField,
		CapsInputGroupImports,
		CapsLabelImports,
		CapsTooltipImports,
		NgIcon,
	],
	providers: [provideIcons({ lucideInfo })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'grid w-full max-w-sm gap-6' },
	template: `
		<form [formRoot]="form">
			<caps-input-group>
				<input capsInput id="email-form" placeholder="spartan-ng@github.com" [formField]="form.email" />
				<caps-input-group-addon align="block-start">
					<label for="email-form" class="text-foreground" capsLabel>Email</label>
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
				<caps-input-group-addon align="block-end">
					<button capsButton class="ml-auto" size="sm" variant="default" type="submit" [disabled]="form().submitting()">
						Submit
					</button>
				</caps-input-group-addon>
			</caps-input-group>
		</form>
	`,
})
export class InputGroupFormPreview {
	protected readonly _model = signal({
		email: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.email, { message: 'Email is required' });
			email(schemaPath.email, { message: 'Enter a valid email address' });
		},
		{
			submission: {
				action: async () => {
					const model = this._model();
					console.log(model);
				},
			},
		},
	);
}
