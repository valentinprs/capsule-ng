import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsItemImports } from '@capsule-ng/caps/item';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';

@Component({
	selector: 'spartan-spinner-preview',
	imports: [CapsSpinnerImports, CapsItemImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
			<caps-item>
				<caps-item-media>
					<caps-spinner aria-hidden="true" />
				</caps-item-media>
				<caps-item-content>
					<caps-item-title class="line-clamp-1">Processing payment...</caps-item-title>
				</caps-item-content>
				<caps-item-content>
					<span class="text-sm tabular-nums">$100.00</span>
				</caps-item-content>
			</caps-item>
		</div>
	`,
})
export class SpinnerPreview {}

export const defaultImports = `
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';
`;
export const defaultSkeleton = `
<caps-spinner aria-hidden="true" class="text-base md:text-lg" />
`;
