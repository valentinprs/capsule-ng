import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsSpinner } from '@capsule-ng/caps/spinner';
import { HlmMarkerImports } from '@spartan-ng/helm/marker';

@Component({
	selector: 'spartan-marker-status-preview',
	imports: [HlmMarkerImports, CapsSpinner],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-8 py-12',
	},
	template: `
		<div hlmMarker role="status">
			<span hlmMarkerIcon>
				<caps-spinner aria-hidden="true" />
			</span>
			<span hlmMarkerContent>Compacting conversation</span>
		</div>
		<div hlmMarker variant="separator" role="status">
			<span hlmMarkerIcon>
				<caps-spinner aria-hidden="true" />
			</span>
			<span hlmMarkerContent>Running tests</span>
		</div>
	`,
})
export class MarkerStatusPreview {}
