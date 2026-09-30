import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { HlmFieldImports } from '@spartan-ng/helm/field';

@Component({
	selector: 'spartan-textarea-invalid',
	imports: [CapsTextareaImports, HlmFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<hlm-field forceInvalid>
			<label hlmFieldLabel for="textarea-invalid">Message</label>
			<textarea capsTextarea forceInvalid id="textarea-invalid" placeholder="Type your message here."></textarea>
			<hlm-field-description>Please enter a valid message.</hlm-field-description>
		</hlm-field>
	`,
})
export class TextareaInvalid {}
