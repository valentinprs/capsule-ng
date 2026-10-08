import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsMarkerImports } from '@capsule-ng/caps/marker';

@Component({
	selector: 'spartan-marker-variants-preview',
	imports: [CapsMarkerImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-8 py-12',
	},
	template: `
		<caps-marker>
			<caps-marker-content>A default marker for inline notes.</caps-marker-content>
		</caps-marker>
		<caps-marker variant="separator">
			<caps-marker-content>A separator marker</caps-marker-content>
		</caps-marker>
		<caps-marker variant="border">
			<caps-marker-content>A border marker for row boundaries.</caps-marker-content>
		</caps-marker>
	`,
})
export class MarkerVariantsPreview {}
