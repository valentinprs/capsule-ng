import { Component } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsEmptyImports } from '@capsule-ng/caps/empty';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCloud } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-empty-outline',
	imports: [NgIcon, CapsButton, CapsEmptyImports],
	providers: [provideIcons({ lucideCloud })],
	template: `
		<caps-empty class="border border-dashed">
			<caps-empty-media variant="icon">
				<ng-icon aria-hidden="true" name="lucideCloud" />
			</caps-empty-media>
			<caps-empty-title>Cloud Storage Empty</caps-empty-title>
			<caps-empty-description>Upload files to your cloud storage to access them anywhere.</caps-empty-description>

			<caps-empty-actions>
				<button type="button" capsButton variant="outline">Upload Files</button>
			</caps-empty-actions>
		</caps-empty>
	`,
})
export class EmptyOutline {}
