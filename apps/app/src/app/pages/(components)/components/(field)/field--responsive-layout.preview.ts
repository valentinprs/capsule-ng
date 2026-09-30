import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
	selector: 'spartan-field-responsive-layout-preview',
	imports: [CapsFieldImports, CapsInputImports, CapsTextareaImports, HlmButtonImports],
	host: {
		class: 'w-full max-w-4xl',
	},
	template: `
		<form>
			<fieldset capsFieldSet>
				<legend capsFieldLegend>Profile</legend>
				<caps-field-description>Fill in your profile information.</caps-field-description>
				<caps-field-separator />
				<caps-field-group>
					<caps-field orientation="responsive">
						<caps-field-content>
							<label capsLabel for="field-responsive-name">Name</label>
							<caps-field-description>Provide your full name for identification</caps-field-description>
						</caps-field-content>
						<input capsInput id="field-responsive-name" type="text" placeholder="Alex Cooper" />
					</caps-field>
					<caps-field-separator />
					<caps-field orientation="responsive">
						<caps-field-content>
							<label capsLabel for="field-responsive-message">Message</label>
							<caps-field-description>
								You can write your message here. Keep it short, preferably under 100 characters.
							</caps-field-description>
						</caps-field-content>
						<textarea
							capsTextarea
							id="field-responsive-message"
							placeholder="Hello, World!"
							class="min-h-[100px] resize-none sm:min-w-[300px]"
						></textarea>
					</caps-field>
					<caps-field-separator />
					<caps-field orientation="responsive">
						<button hlmBtn type="submit">Submit</button>
						<button hlmBtn type="button" variant="outline">Cancel</button>
					</caps-field>
				</caps-field-group>
			</fieldset>
		</form>
	`,
})
export class FieldResponsiveLayoutPreview {}
