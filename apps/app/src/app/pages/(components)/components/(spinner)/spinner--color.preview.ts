import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';

@Component({
	selector: 'spartan-spinner-color-preview',
	imports: [CapsSpinnerImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex items-center gap-6">
			<caps-spinner aria-hidden="true" class="text-2xl text-red-500" />
			<caps-spinner aria-hidden="true" class="text-2xl text-green-500" />
			<caps-spinner aria-hidden="true" class="text-2xl text-blue-500" />
			<caps-spinner aria-hidden="true" class="text-2xl text-yellow-500" />
			<caps-spinner aria-hidden="true" class="text-2xl text-purple-500" />
		</div>
	`,
})
export class SpartanSpinnerColorPreview {}
