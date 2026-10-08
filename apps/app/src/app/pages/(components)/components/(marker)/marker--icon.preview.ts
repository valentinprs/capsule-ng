import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsMarkerImports } from '@capsule-ng/caps/marker';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBookOpenCheck, lucideGitBranch, lucideSearch } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-marker-icon-preview',
	imports: [CapsMarkerImports, NgIcon],
	providers: [provideIcons({ lucideGitBranch, lucideSearch, lucideBookOpenCheck })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-12 py-12',
	},
	template: `
		<caps-marker>
			<caps-marker-icon>
				<ng-icon name="lucideGitBranch" />
			</caps-marker-icon>
			<caps-marker-content>Switched to a new branch</caps-marker-content>
		</caps-marker>
		<caps-marker variant="separator">
			<caps-marker-icon>
				<ng-icon name="lucideSearch" />
			</caps-marker-icon>
			<caps-marker-content>Explored 4 files</caps-marker-content>
		</caps-marker>
		<caps-marker class="flex-col">
			<caps-marker-icon>
				<ng-icon name="lucideBookOpenCheck" />
			</caps-marker-icon>
			<caps-marker-content>Syncing completed</caps-marker-content>
		</caps-marker>
	`,
})
export class MarkerIconPreview {}
