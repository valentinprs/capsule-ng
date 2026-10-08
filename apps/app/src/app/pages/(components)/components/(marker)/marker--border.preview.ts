import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsMarkerImports } from '@capsule-ng/caps/marker';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileText, lucideGitBranch, lucideSearch } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-marker-border-preview',
	imports: [CapsMarkerImports, NgIcon],
	providers: [provideIcons({ lucideGitBranch, lucideSearch, lucideFileText })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-3 py-12',
	},
	template: `
		<caps-marker variant="border">
			<caps-marker-icon>
				<ng-icon name="lucideGitBranch" />
			</caps-marker-icon>
			<caps-marker-content>Switched to release-candidate</caps-marker-content>
		</caps-marker>
		<caps-marker variant="border">
			<caps-marker-icon>
				<ng-icon name="lucideSearch" />
			</caps-marker-icon>
			<caps-marker-content>Reviewed 8 related files</caps-marker-content>
		</caps-marker>
		<caps-marker variant="border">
			<caps-marker-icon>
				<ng-icon name="lucideFileText" />
			</caps-marker-icon>
			<caps-marker-content>Opened implementation notes</caps-marker-content>
		</caps-marker>
	`,
})
export class MarkerBorderPreview {}
