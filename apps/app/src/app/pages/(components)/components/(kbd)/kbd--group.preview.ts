import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsKbdImports } from '@capsule-ng/caps/kbd';

@Component({
	selector: 'spartan-kbd-group-preview',
	imports: [CapsKbdImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-col items-center gap-4">
			<p class="text-muted-foreground text-sm">
				Use
				<caps-kbd-group>
					<kbd capsKbd>Ctrl + B</kbd>
					<kbd capsKbd>Ctrl + K</kbd>
				</caps-kbd-group>
				to open the command palette
			</p>
		</div>
	`,
})
export class KbdGroupPreview {}
