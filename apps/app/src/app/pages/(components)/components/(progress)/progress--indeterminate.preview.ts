import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsProgressImports } from '@capsule-ng/caps/progress';

@Component({
	selector: 'spartan-progress-indeterminate',
	imports: [CapsProgressImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-sm' },
	template: `
		<caps-progress id="preparing-progress" class="w-full max-w-sm" aria-label="Preparing document" />
	`,
})
export class ProgressIndeterminatePreview {}
