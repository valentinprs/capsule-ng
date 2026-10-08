import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsKbdImports } from '@capsule-ng/caps/kbd';

@Component({
	selector: 'spartan-kbd-button-preview',
	imports: [CapsKbdImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-wrap items-center gap-4">
			<button capsButton variant="outline" size="sm" class="pr-2">
				Accept
				<kbd capsKbd>⏎</kbd>
			</button>
			<button capsButton variant="outline" size="sm" class="pr-2">
				Cancel
				<kbd capsKbd>Esc</kbd>
			</button>
		</div>
	`,
})
export class KbdButtonPreview {}
