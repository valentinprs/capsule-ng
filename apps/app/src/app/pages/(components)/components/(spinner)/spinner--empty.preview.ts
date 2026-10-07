import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';

@Component({
	selector: 'spartan-spinner-empty-preview',
	imports: [CapsSpinnerImports, HlmEmptyImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<hlm-empty>
			<hlm-empty-header>
				<hlm-empty-media variant="icon">
					<caps-spinner aria-hidden="true" />
				</hlm-empty-media>
				<div hlmEmptyTitle>Processing your request</div>
				<div hlmEmptyDescription>Please wait while we process your request. Do not refresh the page.</div>
			</hlm-empty-header>
			<hlm-empty-content>
				<button capsButton variant="outline" size="sm">Cancel</button>
			</hlm-empty-content>
		</hlm-empty>
	`,
})
export class SpartanSpinnerEmptyPreview {}
