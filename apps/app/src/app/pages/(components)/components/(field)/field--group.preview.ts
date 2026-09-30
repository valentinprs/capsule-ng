import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';

@Component({
	selector: 'spartan-field-group-preview',
	imports: [CapsFieldImports, HlmCheckboxImports],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<caps-field-group>
			<fieldset capsFieldSet>
				<legend capsFieldLegend variant="label">Response</legend>
				<caps-field-description>
					Get notified when ChatGPT responds to requests that take time, like research or image generation.
				</caps-field-description>
				<caps-field-group data-slot="checkbox-group">
					<caps-field orientation="horizontal">
						<hlm-checkbox inputId="field-group-push-notifications" disabled [checked]="true" />
						<label capsLabel for="field-group-push-notifications" class="font-normal">Push notifications</label>
					</caps-field>
				</caps-field-group>
			</fieldset>
			<caps-field-separator />
			<fieldset capsFieldSet>
				<legend capsFieldLegend variant="label">Tasks</legend>
				<caps-field-description>
					Get notified when tasks you've created have updates.
					<a href="#">Manage tasks</a>
				</caps-field-description>
				<caps-field-group data-slot="checkbox-group">
					<caps-field orientation="horizontal">
						<hlm-checkbox inputId="field-group-push-task" />
						<label capsLabel for="field-group-push-task" class="font-normal">Push notifications</label>
					</caps-field>
					<caps-field orientation="horizontal">
						<hlm-checkbox inputId="field-group-email-task" />
						<label capsLabel for="field-group-email-task" class="font-normal">Email notifications</label>
					</caps-field>
				</caps-field-group>
			</fieldset>
		</caps-field-group>
	`,
})
export class FieldGroupPreview {}
