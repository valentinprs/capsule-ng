import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';

@Component({
	selector: 'spartan-button-group-fluid',
	imports: [CapsButton, CapsButtonGroupImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-sm' },
	template: `
		<caps-button-group fluid aria-label="Save changes">
			<button capsButton>Save</button>
			<button capsButton variant="outline">Cancel</button>
		</caps-button-group>
	`,
})
export class ButtonGroupFluid {}
