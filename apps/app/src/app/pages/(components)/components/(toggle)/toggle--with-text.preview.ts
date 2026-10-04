import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsToggleImports } from '@capsule-ng/caps/toggle';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideItalic } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-toggle-with-text',
	imports: [CapsToggleImports, NgIcon],
	providers: [provideIcons({ lucideItalic })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsToggle aria-label="Toggle italic">
			<ng-icon name="lucideItalic" />
			Italic
		</button>
	`,
})
export class ToggleWithTextPreview {}
