import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsEmptyImports } from '@capsule-ng/caps/empty';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';

@Component({
	selector: 'spartan-spinner-empty-preview',
	imports: [CapsSpinnerImports, CapsEmptyImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-empty>
			<caps-empty-media variant="icon">
				<caps-spinner aria-hidden="true" />
			</caps-empty-media>
			<caps-empty-title>Processing your request</caps-empty-title>
			<caps-empty-description>
				Please wait while we process your request. Do not refresh the page.
			</caps-empty-description>

			<caps-empty-actions>
				<button type="button" capsButton variant="outline" size="sm">Cancel</button>
			</caps-empty-actions>
		</caps-empty>
	`,
})
export class SpartanSpinnerEmptyPreview {}
