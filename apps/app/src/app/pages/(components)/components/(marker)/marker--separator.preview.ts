import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsMarkerImports } from '@capsule-ng/caps/marker';

@Component({
	selector: 'spartan-marker-separator-preview',
	imports: [CapsMarkerImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-8 py-12',
	},
	template: `
		<caps-marker variant="separator">
			<caps-marker-content>Today</caps-marker-content>
		</caps-marker>
		<caps-marker variant="separator">
			<caps-marker-content>Worked for 42s</caps-marker-content>
		</caps-marker>
		<caps-marker variant="separator">
			<caps-marker-content>Conversation compacted</caps-marker-content>
		</caps-marker>
	`,
})
export class MarkerSeparatorPreview {}
