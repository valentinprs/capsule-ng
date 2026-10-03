import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapsLabel } from '@capsule-ng/caps/label';
import { CapsSwitch } from '@capsule-ng/caps/switch';

@Component({
	selector: 'spartan-switch-preview',
	imports: [FormsModule, CapsLabel, CapsSwitch],
	template: `
		<label class="flex items-center" capsLabel>
			<caps-switch class="mr-2" [(ngModel)]="airplaneMode" />
			Airplane mode
		</label>
	`,
})
export class SwitchPreview {
	public airplaneMode = false;
}

export const defaultImports = `
import { CapsSwitch } from '@capsule-ng/caps/switch';
`;
export const defaultSkeleton = `
<caps-switch aria-label="Airplane mode" />
`;
