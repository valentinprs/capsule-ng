import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';

@Component({
	selector: 'spartan-spinner-size-preview',
	imports: [CapsSpinnerImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex items-center gap-6">
			<caps-spinner aria-hidden="true" class="text-xs" />
			<caps-spinner aria-hidden="true" class="text-base" />
			<caps-spinner aria-hidden="true" class="text-2xl" />
			<caps-spinner aria-hidden="true" class="text-[2rem]" />
		</div>
	`,
})
export class SpartanSpinnerSizePreview {}
