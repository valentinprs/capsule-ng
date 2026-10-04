import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSelectImports } from '@capsule-ng/caps/select';
@Component({
	selector: 'spartan-field-select-preview',
	imports: [CapsFieldImports, CapsSelectImports],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<caps-field-set>
			<caps-field-group>
				<caps-field>
					<caps-field-label>Department</caps-field-label>
					<caps-select
						[itemToString]="itemToString"
						placeholder="Choose a department"
						class="w-full"
						id="field-select-department"
					>
						@for (department of departments; track department.value) {
							<caps-select-option [value]="department.value">
								{{ department.label }}
							</caps-select-option>
						}
					</caps-select>
					<caps-field-description>Select your department or area of work.</caps-field-description>
				</caps-field>
			</caps-field-group>
		</caps-field-set>
	`,
})
export class FieldSelectPreview {
	public readonly departments = [
		{ value: 'engineering', label: 'Engineering' },
		{ value: 'design', label: 'Design' },
		{ value: 'marketing', label: 'Marketing' },
		{ value: 'sales', label: 'Sales' },
		{ value: 'support', label: 'Customer Support' },
		{ value: 'hr', label: 'Human Resources' },
		{ value: 'finance', label: 'Finance' },
		{ value: 'operations', label: 'Operations' },
	];

	public readonly itemToString = (value: string) => this.departments.find((d) => d.value === value)?.label ?? '';
}
