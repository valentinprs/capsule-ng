import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { disabled, form, FormField, required } from '@angular/forms/signals';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { fireEvent, render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom/vitest';
import { CapsComboboxImports } from '../index';

const flush = async () => {
	await new Promise((resolve) => setTimeout(resolve, 0));
	await new Promise((resolve) => setTimeout(resolve, 0));
};
@Component({
	selector: 'caps-combobox-consumer',
	imports: [CapsComboboxImports, CapsFieldImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>Country</caps-field-label>
			<caps-combobox
				[formControl]="control"
				[(search)]="search"
				[itemToString]="label"
				[disabled]="disabled()"
				dir="rtl"
			>
				<caps-combobox-input showClear placeholder="Choose country" aria-describedby="manual" />
				<caps-combobox-content>
					<caps-combobox-group>
						<caps-combobox-label>Europe</caps-combobox-label>
						@for (option of options(); track option.code) {
							<caps-combobox-option [value]="option.code" [disabled]="option.disabled">
								{{ option.label }}
							</caps-combobox-option>
						}
						<caps-combobox-separator />
					</caps-combobox-group>
					<caps-combobox-empty>No countries.</caps-combobox-empty>
				</caps-combobox-content>
			</caps-combobox>
			<caps-field-description>Shipping country.</caps-field-description>
			<caps-field-error validator="required">Required country.</caps-field-error>
		</caps-field>
		<p id="manual">Manual help.</p>
		<button>Next</button>
	`,
})
class SingleConsumer {
	public readonly control = new FormControl<string | null>('fr', Validators.required);
	public readonly search = signal('');
	public readonly disabled = signal(false);
	public readonly options = signal([
		{ code: 'fr', label: 'France', disabled: false },
		{ code: 'ch', label: 'Switzerland', disabled: true },
		{ code: 'be', label: 'Belgium', disabled: false },
	]);
	public readonly label = (code: string) => {
		const labels: Record<string, string> = { fr: 'France', ch: 'Switzerland', be: 'Belgium' };
		return labels[code] ?? code;
	};
}
@Component({
	selector: 'caps-signal-choice-consumer',
	imports: [CapsComboboxImports, CapsFieldImports, FormField],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>Framework</caps-field-label>
			<caps-combobox [formField]="fields.framework">
				<caps-combobox-input showClear />
				<caps-combobox-content>
					<caps-combobox-option value="Angular">Angular</caps-combobox-option>
					<caps-combobox-option value="Analog">Analog</caps-combobox-option>
				</caps-combobox-content>
			</caps-combobox>
			<caps-field-error validator="required">Required framework.</caps-field-error>
		</caps-field>
		<button>Next</button>
	`,
})
class SignalConsumer {
	public readonly model = signal<{ framework: string | null }>({ framework: null });
	public readonly disabled = signal(false);
	public readonly fields = form(this.model, (schema) => {
		required(schema.framework);
		disabled(schema.framework, () => this.disabled());
	});
}

describe('CapsCombobox public consumers', () => {
	afterEach(() => document.querySelectorAll('.cdk-overlay-container').forEach((element) => element.remove()));
	it('filters on search without overwriting selected value, selects by keyboard and retains async labels', async () => {
		const view = await render(SingleConsumer);
		await flush();
		view.detectChanges();
		const host = view.fixture.componentInstance;
		const input = screen.getByRole('combobox', { name: 'Country' });
		expect(input).toHaveValue('France');
		input.focus();
		fireEvent.input(input, { target: { value: 'Bel' } });
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(host.control.value).toBe('fr');
		expect(host.search()).toBe('Bel');
		expect(screen.getAllByRole('option')).toHaveLength(1);
		const separator = screen.getByRole('separator', { hidden: true });
		expect(separator).toHaveAttribute('aria-hidden', 'true');
		expect(separator).toHaveAttribute('data-orientation', 'horizontal');
		fireEvent.keyDown(input, { key: 'ArrowDown', keyCode: 40 });
		view.detectChanges();
		expect(input).toHaveAttribute('aria-activedescendant', screen.getByRole('option', { name: 'Belgium' }).id);
		fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(host.control.value).toBe('be');
		expect(input).toHaveValue('Belgium');
		expect(document.activeElement).toBe(input);
		host.options.set([]);
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(input).toHaveValue('Belgium');
	});
	it('names the native input through Field and composes explicit descriptions with validation errors', async () => {
		const view = await render(SingleConsumer);
		await flush();
		view.detectChanges();
		const input = screen.getByRole('combobox', { name: 'Country' });
		expect(input).toHaveAccessibleDescription('Manual help. Shipping country.');
		screen.getByText('Country', { selector: 'label' }).click();
		expect(document.activeElement).toBe(input);
		view.fixture.componentInstance.control.setValue(null);
		view.fixture.componentInstance.control.markAsTouched();
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input).toHaveAccessibleDescription('Manual help. Shipping country. Required country.');
	});
	it('keeps explicit disabled when the form is reenabled and keeps disabled controls closed', async () => {
		const view = await render(SingleConsumer);
		await flush();
		const host = view.fixture.componentInstance;
		host.disabled.set(true);
		view.detectChanges();
		host.control.disable();
		view.detectChanges();
		host.control.enable();
		view.detectChanges();
		await flush();
		view.detectChanges();
		const input = screen.getByRole('combobox');
		expect(input).toBeDisabled();
		expect(screen.getByRole('button', { name: 'Clear selection' })).toBeDisabled();
		fireEvent.keyDown(input, { key: 'ArrowDown', keyCode: 40 });
		view.detectChanges();
		expect(input).toHaveAttribute('aria-expanded', 'false');
		host.disabled.set(false);
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(input).not.toBeDisabled();
		host.control.disable();
		view.detectChanges();
		expect(input).toBeDisabled();
	});
	it('skips disabled options, preserves native focus, closes on Tab and clears selection', async () => {
		const view = await render(SingleConsumer);
		await flush();
		const input = screen.getByRole('combobox');
		input.focus();
		fireEvent.keyDown(input, { key: 'ArrowDown', keyCode: 40 });
		view.detectChanges();
		await flush();
		view.detectChanges();
		fireEvent.keyDown(input, { key: 'Home', keyCode: 36 });
		fireEvent.keyDown(input, { key: 'ArrowDown', keyCode: 40 });
		view.detectChanges();
		expect(input).toHaveAttribute('aria-activedescendant', screen.getByRole('option', { name: 'Belgium' }).id);
		expect(screen.getByRole('listbox').closest('caps-combobox-content')).toHaveAttribute('dir', 'rtl');
		fireEvent.keyDown(input, { key: 'Tab', keyCode: 9 });
		view.detectChanges();
		await flush();
		expect(view.fixture.componentInstance.control.value).toBe('fr');
		const clear = screen.getByRole('button', { name: 'Clear selection' });
		clear.focus();
		expect(document.activeElement).toBe(clear);
		clear.click();
		view.detectChanges();
		await flush();
		expect(view.fixture.componentInstance.control.value).toBeNull();
		expect(input).toHaveValue('');
		expect(document.activeElement).toBe(input);
	});
	it('names a custom popup template and preserves its object value, rendered label and reset placeholder', async () => {
		const country = { code: 'al', label: 'Albania' };
		const control = new FormControl<typeof country | null>(null);
		const label = (value: typeof country) => value.label;
		const view = await render(
			`<caps-combobox [formControl]="control" [itemToString]="label"><caps-combobox-trigger aria-label="Select a country"><caps-combobox-placeholder>Select a country</caps-combobox-placeholder><ng-template capsComboboxValueTemplate let-value><span>Country: {{value.label}}</span></ng-template></caps-combobox-trigger><caps-combobox-content><caps-combobox-input placeholder="Search countries" showTrigger="false"/><caps-combobox-option [value]="country">Albania</caps-combobox-option></caps-combobox-content></caps-combobox>`,
			{ imports: [...CapsComboboxImports, ReactiveFormsModule], componentProperties: { control, country, label } },
		);
		await flush();
		view.detectChanges();
		const trigger = screen.getByRole('combobox', { name: 'Select a country' });
		expect(trigger).toHaveTextContent('Select a country');
		trigger.click();
		view.detectChanges();
		await flush();
		view.detectChanges();
		fireEvent.click(screen.getByRole('option', { name: 'Albania' }));
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(control.value).toEqual(country);
		expect(trigger).toHaveTextContent('Country: Albania');
		expect(trigger).toHaveAccessibleName('Select a country');
		expect(trigger.querySelector('caps-combobox-placeholder')).toHaveAttribute('data-hidden');
		control.setValue(null);
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(trigger.querySelector('caps-combobox-placeholder')).not.toHaveAttribute('data-hidden');
		expect(trigger).not.toHaveTextContent('Country: Albania');
		expect(trigger).toHaveAccessibleName('Select a country');
	});
	it('labels a popup trigger rather than its search input, restores focus and renders a dialog containing a listbox', async () => {
		const control = new FormControl<string | null>(null, Validators.required);
		const view = await render(
			`<caps-field><caps-field-label>Reviewer</caps-field-label><caps-combobox [formControl]="control"><caps-combobox-trigger><caps-combobox-value placeholder="Choose reviewer"/></caps-combobox-trigger><caps-combobox-content><caps-combobox-input placeholder="Search reviewers" showTrigger="false"/><caps-combobox-option value="alice">Alice</caps-combobox-option></caps-combobox-content></caps-combobox><caps-field-description>Project owner.</caps-field-description></caps-field>`,
			{ imports: [...CapsComboboxImports, ...CapsFieldImports, ReactiveFormsModule], componentProperties: { control } },
		);
		await flush();
		view.detectChanges();
		const trigger = screen.getByRole('combobox', { name: 'Reviewer' });
		expect(trigger.tagName).toBe('BUTTON');
		expect(trigger).toHaveAccessibleDescription('Project owner.');
		screen.getByText('Reviewer', { selector: 'label' }).click();
		expect(document.activeElement).toBe(trigger);
		// Native label activation opens the associated button popup. Verify both subsequent toggles.
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(trigger).toHaveAttribute('aria-expanded', 'true');
		fireEvent.click(trigger);
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
		fireEvent.click(trigger);
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(trigger).toHaveAttribute('aria-expanded', 'true');
		const dialog = screen.getByRole('dialog');
		expect(trigger).toHaveAttribute('aria-controls', dialog.id);
		expect(dialog.querySelector('[role=listbox]')).toBeTruthy();
		const input = screen.getByRole('combobox', { name: 'Search reviewers' });
		input.focus();
		fireEvent.keyDown(input, { key: 'Escape', keyCode: 27 });
		view.detectChanges();
		await flush();
		expect(document.activeElement).toBe(trigger);
		expect(trigger.querySelector('input,button,a')).toBeNull();
	});
	it('updates array values with keyboard/chip removal and maintains active-descendant associations without nested controls', async () => {
		const control = new FormControl<string[]>(['Angular']);
		const view = await render(
			`<caps-combobox-multiple [formControl]="control"><caps-combobox-chips><ng-template capsComboboxValues let-values>@for(value of values;track value){<caps-combobox-chip [value]="value">{{value}}</caps-combobox-chip>}</ng-template><input capsComboboxChipInput aria-label="Frameworks"/></caps-combobox-chips><caps-combobox-content><caps-combobox-option value="Angular">Angular</caps-combobox-option><caps-combobox-option value="Analog">Analog</caps-combobox-option></caps-combobox-content></caps-combobox-multiple>`,
			{ imports: [...CapsComboboxImports, ReactiveFormsModule], componentProperties: { control } },
		);
		await flush();
		const input = screen.getByRole('combobox', { name: 'Frameworks' });
		input.focus();
		fireEvent.keyDown(input, { key: 'ArrowDown', keyCode: 40 });
		view.detectChanges();
		await flush();
		view.detectChanges();
		const list = screen.getByRole('listbox');
		expect(input).toHaveAttribute('aria-controls', list.id);
		fireEvent.keyDown(input, { key: 'End', keyCode: 35 });
		view.detectChanges();
		expect(input).toHaveAttribute('aria-activedescendant', screen.getByRole('option', { name: 'Analog' }).id);
		fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
		view.detectChanges();
		await flush();
		expect(control.value).toEqual(['Angular', 'Analog']);
		expect(screen.getAllByRole('option').every((option) => !option.querySelector('button,input,a'))).toBe(true);
		fireEvent.click(screen.getByRole('button', { name: 'Remove Angular' }));
		view.detectChanges();
		await flush();
		expect(control.value).toEqual(['Analog']);
		expect(
			screen.getByRole('button', { name: 'Remove Analog' }).closest('button')?.parentElement?.closest('button'),
		).toBeNull();
		fireEvent.keyDown(input, { key: 'Backspace', keyCode: 8 });
		view.detectChanges();
		expect(control.value).toEqual([]);
	});
	it('supports Signal Forms value, touched/invalid and disabled integration through the public root', async () => {
		const view = await render(SignalConsumer);
		await flush();
		view.detectChanges();
		const input = screen.getByRole('combobox', { name: 'Framework' });
		input.focus();
		fireEvent.keyDown(input, { key: 'ArrowDown', keyCode: 40 });
		view.detectChanges();
		await flush();
		view.detectChanges();
		fireEvent.click(screen.getByRole('option', { name: 'Angular' }));
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(view.fixture.componentInstance.model()).toEqual({ framework: 'Angular' });
		screen.getByRole('button', { name: 'Next' }).focus();
		view.detectChanges();
		await flush();
		expect(view.fixture.componentInstance.fields.framework().touched()).toBe(true);
		fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }));
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(view.fixture.componentInstance.model()).toEqual({ framework: null });
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input).toHaveAccessibleDescription('Required framework.');
		view.fixture.componentInstance.disabled.set(true);
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(input).toBeDisabled();
		view.fixture.componentInstance.disabled.set(false);
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(input).not.toBeDisabled();
	});
});
