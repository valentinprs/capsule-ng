import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';

@Component({
	selector: 'spartan-radio-group-preview',
	imports: [FormsModule, CapsRadioGroupImports],
	template: `
		<caps-radio-group [(ngModel)]="spacing" aria-label="Spacing">
			<caps-radio value="default" disabled>Default</caps-radio>
			<caps-radio value="comfortable">Comfortable</caps-radio>
			<caps-radio value="compact">Compact</caps-radio>
		</caps-radio-group>
	`,
})
export class RadioGroupPreview {
	public spacing = 'comfortable';
}

export const defaultImports = `
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';
`;
export const defaultSkeleton = `
<caps-radio-group aria-label="Options">
  <caps-radio value="option-one">Option one</caps-radio>
  <caps-radio value="option-two">Option two</caps-radio>
</caps-radio-group>
`;
