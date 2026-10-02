import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';

@Component({
	selector: 'spartan-textarea-button',
	imports: [CapsTextareaImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<div class="grid w-full gap-2">
			<textarea capsTextarea aria-label="Message to send" placeholder="Type your message here."></textarea>
			<button capsButton>Send message</button>
		</div>
	`,
})
export class TextareaButtonPreview {}
