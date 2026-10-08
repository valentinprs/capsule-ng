import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsMarkerImports } from '@capsule-ng/caps/marker';

@Component({
	selector: 'spartan-marker-shimmer-preview',
	imports: [CapsMarkerImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-8 py-12',
	},
	template: `
		<caps-marker role="status">
			<caps-marker-content class="shimmer">Thinking...</caps-marker-content>
		</caps-marker>
		<caps-marker variant="separator" role="status">
			<caps-marker-content class="shimmer">Reading 4 files</caps-marker-content>
		</caps-marker>
	`,
})
export class MarkerShimmerPreview {}
