import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';

@Component({
	selector: 'spartan-textarea-preview',
	imports: [CapsTextareaImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<textarea capsTextarea aria-label="Message" placeholder="Type your message here."></textarea>
	`,
})
export class TextareaPreview {}

export const defaultImports = `
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
`;

export const defaultSkeleton = `
<textarea capsTextarea aria-label="Message" placeholder="Type your message here."></textarea>
`;
