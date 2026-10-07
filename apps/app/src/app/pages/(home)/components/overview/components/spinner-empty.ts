import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsSpinner } from '@capsule-ng/caps/spinner';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';

@Component({
	selector: 'spartan-spinner-empty',
	imports: [HlmEmptyImports, CapsButton, CapsSpinner],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div hlmEmpty class="w-full border md:p-6">
			<div hlmEmptyHeader>
				<div hlmEmptyMedia variant="icon">
					<caps-spinner aria-hidden="true" />
				</div>
				<div hlmEmptyTitle>Processing your request</div>
				<div hlmEmptyDescription>Please wait while we process your request. Do not refresh the page.</div>
			</div>
			<div hlmEmptyContent>
				<button capsButton variant="outline" size="sm">Cancel</button>
			</div>
		</div>
	`,
})
export class SpinnerEmpty {}
