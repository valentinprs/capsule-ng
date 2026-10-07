import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { MenuSide } from '@spartan-ng/brain/core';

@Component({
	selector: 'spartan-dropdown-radio-group',
	imports: [CapsDropdownMenuImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu">Open</button>

		<ng-template #menu>
			<caps-menu class="w-32">
				<caps-menu-group label="Panel Position" type="radio" [(value)]="position">
					<button capsMenuRadioItem value="top">Top</button>
					<button capsMenuRadioItem value="bottom">Bottom</button>
					<button capsMenuRadioItem value="right">Right</button>
					<button capsMenuRadioItem value="left">Left</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>
	`,
})
export class DropdownRadioGroup {
	public readonly position = signal<MenuSide>('bottom');
}
