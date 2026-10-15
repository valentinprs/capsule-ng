import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsKbdImports } from '@capsule-ng/caps/kbd';

@Component({
	selector: 'spartan-kbd-preview',
	imports: [CapsKbdImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-col items-center gap-4">
			<caps-kbd-group>
				<kbd capsKbd>⌘</kbd>
				<kbd capsKbd>⇧</kbd>
				<kbd capsKbd>⌥</kbd>
				<kbd capsKbd>⌃</kbd>
			</caps-kbd-group>
			<caps-kbd-group>
				<kbd capsKbd>Ctrl</kbd>
				<span>+</span>
				<kbd capsKbd>B</kbd>
			</caps-kbd-group>
		</div>
	`,
})
export class KbdPreview {}

export const defaultImports = `
import { CapsKbdImports } from '@capsule-ng/caps/kbd';
`;

export const defaultSkeleton = '<kbd capsKbd>⌘</kbd>';
