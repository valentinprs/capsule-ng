import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsToggleGroupImports } from '@capsule-ng/caps/toggle-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBold, lucideItalic, lucideUnderline } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-toggle-group-preview',
	imports: [CapsToggleGroupImports, NgIcon],
	providers: [provideIcons({ lucideBold, lucideItalic, lucideUnderline })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-toggle-group aria-label="Formatting" type="multiple" variant="outline">
			<button capsToggleItem value="bold" aria-label="Toggle bold">
				<ng-icon name="lucideBold" />
			</button>
			<button capsToggleItem value="italic" aria-label="Toggle italic">
				<ng-icon name="lucideItalic" />
			</button>
			<button capsToggleItem value="underline" aria-label="Toggle underline">
				<ng-icon name="lucideUnderline" />
			</button>
		</caps-toggle-group>
	`,
})
export class ToggleGroupPreview {}

export const defaultImports = `
import { CapsToggleGroupImports } from '@capsule-ng/caps/toggle-group';
`;

export const defaultSkeleton = `
<caps-toggle-group aria-label="Formatting" type="single">
	<button capsToggleItem value="a">A</button>
	<button capsToggleItem value="b">B</button>
	<button capsToggleItem value="c">C</button>
</caps-toggle-group>
`;
