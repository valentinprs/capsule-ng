import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';

@Component({
	selector: 'spartan-textarea-disabled',
	imports: [CapsTextareaImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field data-disabled="true">
			<caps-field-label for="textarea-disabled">Message</caps-field-label>
			<textarea capsTextarea id="textarea-disabled" placeholder="Type your message here." disabled></textarea>
		</caps-field>
	`,
})
export class TextareaDisabledPreview {}
