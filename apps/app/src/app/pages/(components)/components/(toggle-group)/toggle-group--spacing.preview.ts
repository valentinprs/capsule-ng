import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsToggleGroupImports } from '@capsule-ng/caps/toggle-group';

@Component({
	selector: 'spartan-toggle-group-spacing',
	imports: [CapsToggleGroupImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-toggle-group aria-label="Formatting" type="single" size="sm" variant="outline" spacing="2" value="top">
			<button capsToggleItem value="top" aria-label="Toggle top">Top</button>
			<button capsToggleItem value="bottom" aria-label="Toggle bottom">Bottom</button>
			<button capsToggleItem value="left" aria-label="Toggle left">Left</button>
			<button capsToggleItem value="right" aria-label="Toggle right">Right</button>
		</caps-toggle-group>
	`,
})
export class ToggleGroupSpacingPreview {}
