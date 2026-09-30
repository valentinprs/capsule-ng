import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
	selector: 'spartan-textarea-button',
	imports: [CapsTextareaImports, HlmButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<div class="grid w-full gap-2">
			<textarea capsTextarea aria-label="Message to send" placeholder="Type your message here."></textarea>
			<button hlmBtn>Send message</button>
		</div>
	`,
})
export class TextareaButtonPreview {}
