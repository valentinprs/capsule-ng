import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsToggleImports } from '@capsule-ng/caps/toggle';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBold, lucideItalic } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-toggle-outline',
	imports: [CapsToggleImports, NgIcon],
	providers: [provideIcons({ lucideItalic, lucideBold })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-wrap items-center gap-2">
			<button capsToggle variant="outline" aria-label="Toggle Italic">
				<ng-icon name="lucideItalic" />
				Italic
			</button>
			<button capsToggle variant="outline" aria-label="Toggle Bold">
				<ng-icon name="lucideBold" />
				Bold
			</button>
		</div>
	`,
})
export class ToggleOutlinePreview {}
