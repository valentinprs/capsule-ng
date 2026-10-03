import { Component } from '@angular/core';
import { CapsCheckboxImports } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsLinkImports } from '@capsule-ng/caps/link';

@Component({
	selector: 'spartan-field-group-preview',
	imports: [CapsLinkImports, CapsFieldImports, CapsCheckboxImports],
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

				<caps-field orientation="horizontal">
					<caps-checkbox disabled [checked]="true" />
					<caps-field-label class="font-normal">Push notifications</caps-field-label>
				</caps-field>
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
						<caps-checkbox />
						<caps-field-label class="font-normal">Push notifications</caps-field-label>
					</caps-field>
					<caps-field orientation="horizontal">
						<caps-checkbox />
						<caps-field-label class="font-normal">Email notifications</caps-field-label>
					</caps-field>
				</caps-field-group>
			</caps-field-set>
		</caps-field-group>
	`,
})
export class FieldGroupPreview {}
