import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';

@Component({
	selector: 'spartan-field-responsive-layout-preview',
	imports: [CapsFieldImports, CapsInputImports, CapsTextareaImports, CapsButtonImports],
	host: {
		class: 'w-full max-w-4xl',
	},
	template: `
		<form>
			<caps-field-set>
				<caps-field-legend>Profile</caps-field-legend>
				<caps-field-description>Fill in your profile information.</caps-field-description>
				<caps-field-separator />
				<caps-field-group>
					<caps-field orientation="responsive">
						<caps-field-content>
							<caps-field-label for="field-responsive-name">Name</caps-field-label>
							<caps-field-description>Provide your full name for identification</caps-field-description>
						</caps-field-content>
						<input capsInput id="field-responsive-name" type="text" placeholder="Alex Cooper" />
					</caps-field>
					<caps-field-separator />
					<caps-field orientation="responsive">
						<caps-field-content>
							<caps-field-label for="field-responsive-message">Message</caps-field-label>
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
						<button capsButton type="submit">Submit</button>
						<button capsButton type="button" variant="outline">Cancel</button>
					</caps-field>
				</caps-field-group>
			</caps-field-set>
		</form>
	`,
})
export class FieldResponsiveLayoutPreview {}
