import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsMarkerImports } from '@capsule-ng/caps/marker';
import { CapsSpinner } from '@capsule-ng/caps/spinner';

@Component({
	selector: 'spartan-marker-status-preview',
	imports: [CapsMarkerImports, CapsSpinner],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-8 py-12',
	},
	template: `
		<caps-marker role="status">
			<caps-marker-icon>
				<caps-spinner aria-hidden="true" />
			</caps-marker-icon>
			<caps-marker-content>Compacting conversation</caps-marker-content>
		</caps-marker>
		<caps-marker variant="separator" role="status">
			<caps-marker-icon>
				<caps-spinner aria-hidden="true" />
			</caps-marker-icon>
			<caps-marker-content>Running tests</caps-marker-content>
		</caps-marker>
	`,
})
export class MarkerStatusPreview {}
