import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { HlmFieldImports } from '@spartan-ng/helm/field';

@Component({
	selector: 'spartan-textarea-field',
	imports: [CapsTextareaImports, HlmFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<hlm-field>
			<label hlmFieldLabel for="textarea-message">Message</label>
			<hlm-field-description>Enter your message below.</hlm-field-description>
			<textarea capsTextarea id="textarea-message" placeholder="Type your message here."></textarea>
		</hlm-field>
	`,
})
export class TextareaField {}
