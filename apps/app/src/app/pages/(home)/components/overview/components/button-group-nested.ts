import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideArrowRight } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-button-group-nested',
	imports: [CapsButtonGroupImports, CapsButton, NgIcon],
	providers: [provideIcons({ lucideArrowLeft, lucideArrowRight })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-button-group aria-label="Actions">
			<caps-button-group aria-label="Actions">
				<button capsButton variant="outline" size="sm">1</button>
				<button capsButton variant="outline" size="sm">2</button>
				<button capsButton variant="outline" size="sm">3</button>
			</caps-button-group>
			<caps-button-group aria-label="Actions">
				<button capsButton variant="outline" size="icon-sm">
					<ng-icon name="lucideArrowLeft" />
				</button>
				<button capsButton variant="outline" size="icon-sm">
					<ng-icon name="lucideArrowRight" />
				</button>
			</caps-button-group>
		</caps-button-group>
	`,
})
export class ButtonGroupNested {}
