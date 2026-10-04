import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { BrnSelect } from '@spartan-ng/brain/select';
import { fireEvent, render, screen } from '@testing-library/angular';
import { CapsSelectImports } from '../index';

@Component({
	selector: 'caps-select-test',
	imports: [CapsSelectImports, CapsFieldImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>Country</caps-field-label>
			<caps-select [formControl]="country" placeholder="Choose" aria-describedby="manual">
				<caps-select-group label="Europe">
					@for (option of options(); track option.value) {
						<caps-select-option [value]="option.value" [disabled]="option.disabled">
							{{ option.label }}
						</caps-select-option>
					}
				</caps-select-group>
			</caps-select>
			<caps-field-description>Delivery country</caps-field-description>
			<caps-field-error validator="required">Required</caps-field-error>
		</caps-field>
		<p id="manual">Manual description</p>
	`,
})
class Host {
	public readonly country = new FormControl<string | null>('fr', Validators.required);
	public readonly options = signal([
		{ value: 'fr', label: 'France', disabled: false },
		{ value: 'ch', label: 'Switzerland', disabled: true },
		{ value: 'be', label: 'Belgium', disabled: false },
	]);
}
const flush = async () => {
	await new Promise((resolve) => setTimeout(resolve, 0));
	await new Promise((resolve) => setTimeout(resolve, 0));
};

describe('CapsSelect public composition', () => {
	afterEach(() => document.querySelectorAll('.cdk-overlay-container').forEach((element) => element.remove()));
	it('registers projected options and displays their label before opening, including dynamic text', async () => {
		const view = await render(Host);
		await flush();
		view.detectChanges();
		const brain = view.fixture.debugElement.query(By.directive(BrnSelect)).injector.get(BrnSelect);
		expect(brain.items()).toHaveLength(3);
		expect(screen.getByRole('combobox')).toHaveTextContent('France');
		view.fixture.componentInstance.options.update((options) =>
			options.map((option) => ({ ...option, label: option.value === 'fr' ? 'French Republic' : option.label })),
		);
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(screen.getByRole('combobox')).toHaveTextContent('French Republic');
	});
	it('associates Field label and descriptions with the native button and merges errors', async () => {
		const view = await render(Host);
		await flush();
		view.detectChanges();
		const trigger = screen.getByRole('combobox', { name: 'Country' });
		expect(trigger.tagName).toBe('BUTTON');
		expect(trigger).toHaveAccessibleDescription('Manual description Delivery country');
		view.fixture.componentInstance.country.setValue(null);
		view.fixture.componentInstance.country.markAsTouched();
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(trigger).toHaveAttribute('aria-invalid', 'true');
		expect(trigger).toHaveAccessibleDescription('Manual description Delivery country Required');
	});
	it('selects with keyboard, skips disabled options, retains focus and updates the form', async () => {
		const view = await render(Host);
		await flush();
		const trigger = screen.getByRole('combobox');
		trigger.focus();
		fireEvent.keyDown(trigger, { key: 'ArrowDown' });
		view.detectChanges();
		await flush();
		expect(screen.getByRole('group', { name: 'Europe' })).toBeTruthy();
		fireEvent.keyDown(trigger, { key: 'End', keyCode: 35 });
		fireEvent.keyDown(trigger, { key: 'Enter' });
		view.detectChanges();
		await flush();
		expect(view.fixture.componentInstance.country.value).toBe('be');
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
		expect(document.activeElement).toBe(trigger);
		expect(view.fixture.componentInstance.country.touched).toBe(true);
		view.fixture.componentInstance.country.disable();
		view.detectChanges();
		expect(trigger).toBeDisabled();
	});
	it('supports array forms and a custom value template without additional interactive elements', async () => {
		const control = new FormControl(['fr']);
		const view = await render(
			`<caps-select-multiple aria-label="Countries" [formControl]="control" placeholder="Choose"><ng-template capsSelectValue let-values>{{ values.length }} countries</ng-template><caps-select-option value="fr">France</caps-select-option><caps-select-option value="be">Belgium</caps-select-option></caps-select-multiple>`,
			{ imports: [CapsSelectImports, ReactiveFormsModule], componentProperties: { control } },
		);
		await flush();
		view.detectChanges();
		const trigger = screen.getByRole('combobox', { name: 'Countries' });
		expect(trigger).toHaveTextContent('1 countries');
		fireEvent.click(trigger);
		view.detectChanges();
		await flush();
		expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true');
		fireEvent.click(screen.getByRole('option', { name: 'Belgium' }));
		view.detectChanges();
		await flush();
		expect(control.value).toEqual(['fr', 'be']);
		expect(trigger).toHaveTextContent('2 countries');
		expect(trigger.querySelector('button,input,select')).toBeNull();
	});
	it('marks touched on blur without opening and honors updateOn blur', async () => {
		const control = new FormControl<string | null>(null, { validators: Validators.required, updateOn: 'blur' });
		const view = await render(
			`<caps-select aria-label="Country" [formControl]="control" placeholder="Choose"><caps-select-option value="fr">France</caps-select-option></caps-select>`,
			{ imports: [CapsSelectImports, ReactiveFormsModule], componentProperties: { control } },
		);
		const trigger = screen.getByRole('combobox');
		trigger.focus();
		fireEvent.blur(trigger);
		view.detectChanges();
		expect(control.touched).toBe(true);
		fireEvent.click(trigger);
		view.detectChanges();
		await flush();
		fireEvent.click(screen.getByRole('option', { name: 'France' }));
		view.detectChanges();
		await flush();
		expect(control.value).toBe('fr');
	});
	it('reopens with projected dynamic options, supports typeahead labels and Escape/Tab', async () => {
		const view = await render(Host);
		await flush();
		const trigger = screen.getByRole('combobox');
		fireEvent.click(trigger);
		view.detectChanges();
		await flush();
		fireEvent.keyDown(trigger, { key: 'b', keyCode: 66 });
		await new Promise((resolve) => setTimeout(resolve, 250));
		fireEvent.keyDown(trigger, { key: 'Enter' });
		view.detectChanges();
		await flush();
		expect(view.fixture.componentInstance.country.value).toBe('be');
		fireEvent.click(trigger);
		view.detectChanges();
		await flush();
		expect(screen.getAllByRole('option')).toHaveLength(3);
		fireEvent.keyDown(trigger, { key: 'Tab', keyCode: 9 });
		view.detectChanges();
		await flush();
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
		fireEvent.click(trigger);
		view.detectChanges();
		await flush();
		fireEvent.keyDown(trigger, { key: 'Escape', keyCode: 27 });
		view.detectChanges();
		await flush();
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
	});
	it('separates pristine invalid state from touched and forced error appearance', async () => {
		const control = new FormControl<string | null>(null, Validators.required);
		const view = await render(
			`<caps-select aria-label="Country" [formControl]="control" [forceInvalid]="forced"><caps-select-option value="fr">France</caps-select-option></caps-select>`,
			{ imports: [CapsSelectImports, ReactiveFormsModule], componentProperties: { control, forced: false } },
		);
		const trigger = screen.getByRole('combobox');
		expect(trigger).toHaveAttribute('aria-invalid', 'true');
		expect(trigger).not.toHaveAttribute('data-matches-spartan-invalid');
		fireEvent.blur(trigger);
		view.detectChanges();
		expect(trigger).toHaveAttribute('data-matches-spartan-invalid', 'true');
		control.setValue('fr');
		view.detectChanges();
		expect(trigger).not.toHaveAttribute('aria-invalid');
		expect(trigger).not.toHaveAttribute('data-matches-spartan-invalid');
		await view.rerender({ componentProperties: { control, forced: true } });
		expect(trigger).toHaveAttribute('data-matches-spartan-invalid', 'true');
		expect(trigger).not.toHaveAttribute('aria-invalid');
	});
});
