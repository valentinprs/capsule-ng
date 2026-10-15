import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsMarkerImports } from '@capsule-ng/caps/marker';
import { CapsSpinner } from '@capsule-ng/caps/spinner';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGitBranch, lucideSearch } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-marker-preview',
	imports: [CapsMarkerImports, CapsSpinner, NgIcon],
	providers: [provideIcons({ lucideGitBranch, lucideSearch })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-8 py-12',
	},
	template: `
		<caps-marker>
			<caps-marker-icon>
				<ng-icon name="lucideGitBranch" />
			</caps-marker-icon>
			<caps-marker-content>Switched to a new branch</caps-marker-content>
		</caps-marker>
		<caps-marker role="status">
			<caps-marker-icon>
				<caps-spinner aria-hidden="true" />
			</caps-marker-icon>
			<caps-marker-content class="shimmer">Thinking...</caps-marker-content>
		</caps-marker>
		<caps-marker variant="separator">
			<caps-marker-content>Conversation compacted</caps-marker-content>
		</caps-marker>
		<caps-marker>
			<caps-marker-icon>
				<ng-icon name="lucideSearch" />
			</caps-marker-icon>
			<caps-marker-content>Explored 4 files</caps-marker-content>
		</caps-marker>
	`,
})
export class MarkerPreview {}

export const defaultImports = `
import { CapsMarkerImports } from '@capsule-ng/caps/marker';
import { CapsSpinner } from '@capsule-ng/caps/spinner';
`;

export const defaultSkeleton = `
<caps-marker role="status">
  <caps-marker-icon>
    <caps-spinner aria-hidden="true" />
  </caps-marker-icon>
  <caps-marker-content class="shimmer">Checking the logs...</caps-marker-content>
</caps-marker>
`;
