import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';

@Component({
	selector: 'spartan-field-textarea-preview',
	imports: [CapsFieldImports, CapsTextareaImports],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<caps-field-set>
			<caps-field-group>
				<caps-field>
					<caps-field-label for="field-textarea-preview-firstname">Feedback</caps-field-label>
					<textarea
						capsTextarea
						id="field-textarea-preview-firstname"
						placeholder="Your feedback helps us improve..."
					></textarea>
					<caps-field-description>Share your thoughts about our service.</caps-field-description>
				</caps-field>
			</caps-field-group>
		</caps-field-set>
	`,
})
export class FieldTextareaPreview {}
