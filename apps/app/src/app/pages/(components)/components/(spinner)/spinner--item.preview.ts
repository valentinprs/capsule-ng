import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsItemImports } from '@capsule-ng/caps/item';
import { CapsProgressImports } from '@capsule-ng/caps/progress';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';

@Component({
	selector: 'spartan-spinner-item-preview',
	imports: [CapsSpinnerImports, CapsItemImports, CapsButtonImports, CapsProgressImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex w-full max-w-md flex-col gap-4 [--radius:1rem]">
			<caps-item>
				<caps-item-media>
					<caps-spinner aria-hidden="true" />
				</caps-item-media>
				<caps-item-content>
					<caps-item-title>Downloading...</caps-item-title>
					<caps-item-description>129 MB / 1000 MB</caps-item-description>
				</caps-item-content>
				<caps-item-actions class="hidden sm:flex">
					<button capsButton variant="outline" size="sm">Cancel</button>
				</caps-item-actions>
				<caps-item-footer>
					<caps-progress [value]="129" [max]="1000" aria-label="Downloading file" />
				</caps-item-footer>
			</caps-item>
		</div>
	`,
})
export class SpartanSpinnerItemPreview {}
