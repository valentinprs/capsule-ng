import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsToggleGroupImports } from '@capsule-ng/caps/toggle-group';

@Component({
	selector: 'spartan-toggle-group-outline',
	imports: [CapsToggleGroupImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-toggle-group aria-label="Call filter" variant="outline" value="all">
			<button capsToggleItem value="all" aria-label="Toggle all">All</button>
			<button capsToggleItem value="missed" aria-label="Toggle missed">Missed</button>
		</caps-toggle-group>
	`,
})
export class ToggleGroupOutlinePreview {}
