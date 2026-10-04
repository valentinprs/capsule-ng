import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsItemImports } from '@capsule-ng/caps/item';
import { HlmProgressImports } from '@spartan-ng/helm/progress';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';

@Component({
	selector: 'spartan-spinner-item-preview',
	imports: [HlmSpinnerImports, CapsItemImports, CapsButtonImports, HlmProgressImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex w-full max-w-md flex-col gap-4 [--radius:1rem]">
			<caps-item>
				<caps-item-media>
					<hlm-spinner />
				</caps-item-media>
				<caps-item-content>
					<caps-item-title>Downloading...</caps-item-title>
					<caps-item-description>129 MB / 1000 MB</caps-item-description>
				</caps-item-content>
				<caps-item-actions class="hidden sm:flex">
					<button capsButton variant="outline" size="sm">Cancel</button>
				</caps-item-actions>
				<caps-item-footer>
					<hlm-progress value="75">
						<hlm-progress-indicator />
					</hlm-progress>
				</caps-item-footer>
			</caps-item>
		</div>
	`,
})
export class SpartanSpinnerItemPreview {}
