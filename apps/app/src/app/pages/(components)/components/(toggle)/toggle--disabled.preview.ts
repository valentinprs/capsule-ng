import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsToggleImports } from '@capsule-ng/caps/toggle';

@Component({
	selector: 'spartan-toggle-disabled',
	imports: [CapsToggleImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-wrap items-center gap-2">
			<button capsToggle aria-label="Toggle disabled" disabled>Disabled</button>
			<button capsToggle variant="outline" aria-label="Toggle disabled outline" disabled>Disabled</button>
		</div>
	`,
})
export class ToggleDisabledPreview {}
