import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { HlmFieldImports } from '@spartan-ng/helm/field';

@Component({
	selector: 'spartan-textarea-disabled',
	imports: [CapsTextareaImports, HlmFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<hlm-field data-disabled="true">
			<label hlmFieldLabel for="textarea-disabled">Message</label>
			<textarea capsTextarea id="textarea-disabled" placeholder="Type your message here." disabled></textarea>
		</hlm-field>
	`,
})
export class TextareaDisabledPreview {}
