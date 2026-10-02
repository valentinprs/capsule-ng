import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';

@Component({
	selector: 'spartan-textarea-field',
	imports: [CapsTextareaImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field>
			<caps-field-label for="textarea-message">Message</caps-field-label>
			<caps-field-description>Enter your message below.</caps-field-description>
			<textarea capsTextarea id="textarea-message" placeholder="Type your message here."></textarea>
		</caps-field>
	`,
})
export class TextareaField {}
