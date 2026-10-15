import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsMarkerImports } from '@capsule-ng/caps/marker';
import { toast } from '@capsule-ng/caps/sonner';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGitBranch, lucideRotateCcw } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-marker-link-button-preview',
	imports: [CapsMarkerImports, NgIcon],
	providers: [provideIcons({ lucideGitBranch, lucideRotateCcw })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-8 py-12',
	},
	template: `
		<a capsMarker href="#examples__links_and_buttons">
			<caps-marker-icon>
				<ng-icon name="lucideGitBranch" />
			</caps-marker-icon>
			<caps-marker-content>View the pull request</caps-marker-content>
		</a>
		<button capsMarker type="button" class="hover:text-foreground transition-colors" (click)="onRevert()">
			<caps-marker-icon>
				<ng-icon name="lucideRotateCcw" />
			</caps-marker-icon>
			<caps-marker-content>Revert this change</caps-marker-content>
		</button>
	`,
})
export class MarkerLinkButtonPreview {
	protected onRevert(): void {
		toast('You clicked the revert button');
	}
}
