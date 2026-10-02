import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';

@Component({
	selector: 'spartan-textarea-invalid',
	imports: [CapsTextareaImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field forceInvalid>
			<caps-field-label for="textarea-invalid">Message</caps-field-label>
			<textarea capsTextarea forceInvalid id="textarea-invalid" placeholder="Type your message here."></textarea>
			<caps-field-description>Please enter a valid message.</caps-field-description>
		</caps-field>
	`,
})
export class TextareaInvalid {}
