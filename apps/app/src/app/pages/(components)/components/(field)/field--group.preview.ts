import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsLinkImports } from '@capsule-ng/caps/link';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';

@Component({
	selector: 'spartan-field-group-preview',
	imports: [CapsLinkImports, CapsFieldImports, HlmCheckboxImports],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<caps-field-group>
			<caps-field-set>
				<caps-field-legend variant="label">Response</caps-field-legend>
				<caps-field-description>
					Get notified when ChatGPT responds to requests that take time, like research or image generation.
				</caps-field-description>
				<caps-field-group data-slot="checkbox-group">
					<caps-field orientation="horizontal">
						<hlm-checkbox inputId="field-group-push-notifications" disabled [checked]="true" />
						<caps-field-label for="field-group-push-notifications" class="font-normal">
							Push notifications
						</caps-field-label>
					</caps-field>
				</caps-field-group>
			</caps-field-set>
			<caps-field-separator />
			<caps-field-set>
				<caps-field-legend variant="label">Tasks</caps-field-legend>
				<caps-field-description>
					Get notified when tasks you've created have updates.
					<a capsLink href="#">Manage tasks</a>
				</caps-field-description>
				<caps-field-group data-slot="checkbox-group">
					<caps-field orientation="horizontal">
						<hlm-checkbox inputId="field-group-push-task" />
						<caps-field-label for="field-group-push-task" class="font-normal">Push notifications</caps-field-label>
					</caps-field>
					<caps-field orientation="horizontal">
						<hlm-checkbox inputId="field-group-email-task" />
						<caps-field-label for="field-group-email-task" class="font-normal">Email notifications</caps-field-label>
					</caps-field>
				</caps-field-group>
			</caps-field-set>
		</caps-field-group>
	`,
})
export class FieldGroupPreview {}
