import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapsCheckboxImports } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-checkbox-preview',
	imports: [FormsModule, CapsCheckboxImports, CapsFieldImports],
	host: { class: 'block w-full max-w-md' },
	template: `
		<caps-field-group class="gap-6">
			<caps-field orientation="horizontal">
				<caps-checkbox id="terms" [(ngModel)]="accepted" />
				<caps-field-label for="terms">Accept terms and conditions</caps-field-label>
			</caps-field>
			<caps-field orientation="horizontal">
				<caps-checkbox id="terms-2" [checked]="true" />
				<caps-field-content>
					<caps-field-label for="terms-2">Accept terms and conditions</caps-field-label>
					<caps-field-description>
						By clicking this checkbox, you agree to the terms and conditions.
					</caps-field-description>
				</caps-field-content>
			</caps-field>
			<caps-field orientation="horizontal">
				<caps-checkbox id="toggle" disabled />
				<caps-field-label for="toggle">Enable notifications</caps-field-label>
			</caps-field>
			<caps-field orientation="horizontal">
				<caps-checkbox id="mixed" [indeterminate]="true" />
				<caps-field-label for="mixed">Select all notifications</caps-field-label>
			</caps-field>
			<caps-field-label
				for="toggle-2"
				class="hover:bg-accent/50 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-accent/50 rounded-lg border p-3"
			>
				<caps-field orientation="horizontal">
					<caps-checkbox id="toggle-2" [checked]="true" />
					<caps-field-content>
						<span class="text-sm font-medium">Enable notifications</span>
						<caps-field-description>You can enable or disable notifications at any time.</caps-field-description>
					</caps-field-content>
				</caps-field>
			</caps-field-label>
		</caps-field-group>
	`,
})
export class CheckboxPreview {
	public accepted = false;
}

export const defaultImports = `
import { CapsCheckboxImports } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';
`;
export const defaultSkeleton = `
<caps-field orientation="horizontal">
  <caps-checkbox id="terms" />
  <caps-field-label for="terms">Accept terms and conditions</caps-field-label>
</caps-field>
`;
