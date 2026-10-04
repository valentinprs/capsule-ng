import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsToggleGroupImports } from '@capsule-ng/caps/toggle-group';

@Component({
	selector: 'spartan-toggle-group-size',
	imports: [CapsToggleGroupImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-col gap-4">
			<caps-toggle-group aria-label="Formatting" type="single" size="sm" variant="outline" value="top">
				<button capsToggleItem value="top" aria-label="Toggle top">Top</button>
				<button capsToggleItem value="bottom" aria-label="Toggle bottom">Bottom</button>
				<button capsToggleItem value="left" aria-label="Toggle left">Left</button>
				<button capsToggleItem value="right" aria-label="Toggle right">Right</button>
			</caps-toggle-group>
			<caps-toggle-group aria-label="Formatting" type="single" variant="outline" value="top">
				<button capsToggleItem value="top" aria-label="Toggle top">Top</button>
				<button capsToggleItem value="bottom" aria-label="Toggle bottom">Bottom</button>
				<button capsToggleItem value="left" aria-label="Toggle left">Left</button>
				<button capsToggleItem value="right" aria-label="Toggle right">Right</button>
			</caps-toggle-group>
		</div>
	`,
})
export class ToggleGroupSizePreview {}
