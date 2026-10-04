import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsToggleImports } from '@capsule-ng/caps/toggle';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBookmark } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-toggle-preview',
	imports: [CapsToggleImports, NgIcon],
	providers: [provideIcons({ lucideBookmark })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button
			capsToggle
			size="sm"
			variant="outline"
			aria-label="Toggle bookmark"
			class="data-[state=on]:*:[ng-icon]:*:[svg]:fill-foreground data-[state=on]:bg-transparent"
		>
			<ng-icon name="lucideBookmark" />
			Bookmark
		</button>
	`,
})
export class TogglePreview {}

export const defaultImports = `
import { CapsToggleImports } from '@capsule-ng/caps/toggle';
`;
export const defaultSkeleton = `
<button capsToggle>Toggle</button>
`;
