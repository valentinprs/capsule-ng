import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsToggleImports } from '@capsule-ng/caps/toggle';

@Component({
	selector: 'spartan-toggle-size',
	imports: [CapsToggleImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-wrap items-center gap-2">
			<button capsToggle variant="outline" size="sm" aria-label="Toggle small">Small</button>
			<button capsToggle variant="outline" aria-label="Toggle default">Default</button>
			<button capsToggle variant="outline" size="lg" aria-label="Toggle large">Large</button>
		</div>
	`,
})
export class ToggleSizePreview {}
