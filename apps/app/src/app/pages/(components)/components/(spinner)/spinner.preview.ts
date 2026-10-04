import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsItemImports } from '@capsule-ng/caps/item';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';

@Component({
	selector: 'spartan-spinner-preview',
	imports: [HlmSpinnerImports, CapsItemImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
			<caps-item>
				<caps-item-media>
					<hlm-spinner />
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
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
`;
export const defaultSkeleton = `
<hlm-spinner class="text-base md:text-lg" />
`;
