import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { fireEvent, render, screen } from '@testing-library/angular';
import { CapsNativeSelectImports } from '../index';

@Component({
	selector: 'caps-native-select-test',
	imports: [CapsNativeSelectImports, CapsFieldImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>Language</caps-field-label>
			<select capsNativeSelect [formControl]="language" aria-describedby="manual">
				<option value="" disabled>Choose</option>
				<optgroup label="Available">
					<option value="fr">French</option>
					<option value="en">English</option>
				</optgroup>
				<option value="de" disabled>German</option>
			</select>
			<caps-field-description>Display language</caps-field-description>
			<caps-field-error validator="required">Required</caps-field-error>
		</caps-field>
		<p id="manual">Manual hint</p>
	`,
})
class Host {
	public readonly language = new FormControl('', { nonNullable: true, validators: [Validators.required] });
}

describe('CapsNativeSelect public API', () => {
	it('keeps the native control, groups, disabled options and Field associations', async () => {
		const view = await render(Host);
		const select = screen.getByRole('combobox', { name: 'Language' }) as HTMLSelectElement;
		expect(select.tagName).toBe('SELECT');
		expect(select).toHaveAccessibleDescription('Manual hint Display language');
		expect(screen.getByRole('group', { name: 'Available' }).tagName).toBe('OPTGROUP');
		expect(screen.getByRole('option', { name: 'German' })).toBeDisabled();
		fireEvent.change(select, { target: { value: 'fr' } });
		view.detectChanges();
		expect(view.fixture.componentInstance.language.value).toBe('fr');
		expect(view.fixture.componentInstance.language.dirty).toBe(true);
		fireEvent.blur(select);
		view.detectChanges();
		expect(view.fixture.componentInstance.language.touched).toBe(true);
		view.fixture.componentInstance.language.setValue('');
		view.detectChanges();
		expect(select).toHaveAttribute('aria-invalid', 'true');
		expect(select).toHaveAccessibleDescription('Manual hint Display language Required');
		view.fixture.componentInstance.language.disable();
		view.detectChanges();
		expect(select).toBeDisabled();
	});
	it('retains Angular object values, compareWith and native multiple/size', async () => {
		const options = [
			{ id: 1, label: 'One' },
			{ id: 2, label: 'Two' },
		];
		const control = new FormControl([{ id: 2, label: 'Other instance' }]);
		const view = await render(
			`<select capsNativeSelect multiple size="4" aria-label="Numbers" [formControl]="control" [compareWith]="compare">@for (option of options; track option.id) {<option [ngValue]="option">{{ option.label }}</option>}</select>`,
			{
				imports: [CapsNativeSelectImports, ReactiveFormsModule],
				componentProperties: { options, control, compare: (a: { id: number }, b: { id: number }) => a?.id === b?.id },
			},
		);
		const select = screen.getByRole('listbox', { name: 'Numbers' }) as HTMLSelectElement;
		expect(select.multiple).toBe(true);
		expect(select.size).toBe(4);
		expect(select.options[1].selected).toBe(true);
		select.options[0].selected = true;
		fireEvent.change(select);
		view.detectChanges();
		expect(control.value).toEqual(options);
	});
});
