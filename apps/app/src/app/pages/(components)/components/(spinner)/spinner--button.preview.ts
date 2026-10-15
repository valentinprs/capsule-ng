import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';

@Component({
	selector: 'spartan-spinner-button-preview',
	imports: [CapsSpinnerImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-col items-center gap-4">
			<button capsButton size="sm" disabled>
				<caps-spinner aria-hidden="true" />
				Loading...
			</button>
			<button capsButton variant="outline" size="sm" disabled>
				<caps-spinner aria-hidden="true" />
				Please wait
			</button>
			<button capsButton variant="secondary" size="sm" disabled>
				<caps-spinner aria-hidden="true" />
				Processing
			</button>
		</div>
	`,
})
export class SpartanSpinnerButtonPreview {}
