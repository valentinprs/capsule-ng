import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { fireEvent, render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom/vitest';
import { CapsAutocompleteImports } from '../index';

const flush = async () => {
	await new Promise((resolve) => setTimeout(resolve, 0));
	await new Promise((resolve) => setTimeout(resolve, 0));
};
@Component({
	selector: 'caps-autocomplete-consumer',
	imports: [CapsAutocompleteImports, CapsFieldImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>City</caps-field-label>
			<caps-autocomplete
				[formControl]="control"
				[(search)]="search"
				[disabled]="disabled()"
				[autoHighlight]="highlight()"
				dir="rtl"
			>
				<caps-autocomplete-input placeholder="Search cities" showClear aria-describedby="manual" />
				<caps-autocomplete-content>
					<caps-autocomplete-group>
						<caps-autocomplete-label>Cities</caps-autocomplete-label>
						@for (city of matches(); track city) {
							<caps-autocomplete-option [value]="city" [disabled]="city === 'Lyon'">
								{{ city }}
							</caps-autocomplete-option>
						}
						<caps-autocomplete-separator />
					</caps-autocomplete-group>
					<caps-autocomplete-empty>No cities.</caps-autocomplete-empty>
				</caps-autocomplete-content>
			</caps-autocomplete>
			<caps-field-description>Choose a city.</caps-field-description>
			<caps-field-error validator="required">Required city.</caps-field-error>
		</caps-field>
		<p id="manual">Manual help.</p>
		<button>Next</button>
	`,
})
class SelectionConsumer {
	public readonly control = new FormControl<string | null>(null, Validators.required);
	public readonly search = signal('');
	public readonly disabled = signal(false);
	public readonly highlight = signal(false);
	public readonly options = signal(['Paris', 'Lyon', 'Nantes']);
	public readonly matches = computed(() =>
		this.options().filter((city) => city.toLowerCase().includes(this.search().toLowerCase())),
	);
}

describe('CapsAutocomplete public consumers', () => {
	afterEach(() => document.querySelectorAll('.cdk-overlay-container').forEach((element) => element.remove()));
	it('keeps search distinct from selected form value and selects through owned listbox with keyboard', async () => {
		const view = await render(SelectionConsumer);
		await flush();
		view.detectChanges();
		const input = screen.getByRole('combobox', { name: 'City' });
		input.focus();
		fireEvent.input(input, { target: { value: 'Pa' } });
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(view.fixture.componentInstance.search()).toBe('Pa');
		expect(view.fixture.componentInstance.control.value).toBeNull();
		const list = screen.getByRole('listbox');
		const separator = screen.getByRole('separator', { hidden: true });
		expect(separator).toHaveAttribute('aria-hidden', 'true');
		expect(separator).toHaveAttribute('data-orientation', 'horizontal');
		expect(input).toHaveAttribute('aria-controls', list.id);
		fireEvent.keyDown(input, { key: 'ArrowDown', keyCode: 40 });
		view.detectChanges();
		expect(input.getAttribute('aria-activedescendant')).toBe(screen.getByRole('option', { name: 'Paris' }).id);
		fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(view.fixture.componentInstance.control.value).toBe('Paris');
		expect(input).toHaveValue('Paris');
		expect(input).toHaveAttribute('aria-expanded', 'false');
		expect(document.activeElement).toBe(input);
		view.fixture.componentInstance.options.set([]);
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(input).toHaveValue('Paris');
		expect(view.fixture.componentInstance.control.value).toBe('Paris');
	});
	it('resolves transformed ids after selection and retains the label when async options disappear', async () => {
		const control = new FormControl<string | null>(null);
		const search = signal('');
		const options = signal([
			{ id: '1', label: 'Alpha' },
			{ id: '2', label: 'Beta' },
		]);
		const labels: Record<string, string> = { '1': 'Alpha', '2': 'Beta' };
		const itemToString = (id: string) => labels[id] ?? id;
		const matches = computed(() =>
			options().filter((option) => option.label.toLowerCase().includes(search().toLowerCase())),
		);
		const view = await render(
			`<caps-autocomplete [formControl]="control" [(search)]="search" [itemToString]="itemToString">
			<caps-autocomplete-input aria-label="Character"/>
			<caps-autocomplete-content>@for (option of matches(); track option.id) {
			<caps-autocomplete-option [value]="option.id">{{ option.label }}</caps-autocomplete-option>
			}</caps-autocomplete-content></caps-autocomplete>`,
			{
				imports: [...CapsAutocompleteImports, ReactiveFormsModule],
				componentProperties: { control, search, itemToString, matches },
			},
		);
		await flush();
		const input = screen.getByRole('combobox', { name: 'Character' });
		input.focus();
		fireEvent.input(input, { target: { value: 'Be' } });
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(search()).toBe('Be');
		expect(control.value).toBeNull();
		expect(screen.getAllByRole('option')).toHaveLength(1);
		fireEvent.click(screen.getByRole('option', { name: 'Beta' }));
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(control.value).toBe('2');
		expect(input).toHaveValue('Beta');
		expect(search()).toBe('Be');
		options.set([]);
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(control.value).toBe('2');
		expect(input).toHaveValue('Beta');
	});
	it('associates Field label/help/errors with the native input and marks touched on real focus transfer', async () => {
		const view = await render(SelectionConsumer);
		await flush();
		view.detectChanges();
		const input = screen.getByRole('combobox', { name: 'City' });
		expect(input.tagName).toBe('INPUT');
		expect(input).toHaveAccessibleDescription('Manual help. Choose a city.');
		expect(input).toHaveAttribute('aria-invalid', 'true');
		screen.getByText('City', { selector: 'label' }).click();
		expect(document.activeElement).toBe(input);
		screen.getByRole('button', { name: 'Next' }).focus();
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(view.fixture.componentInstance.control.touched).toBe(true);
		expect(input).toHaveAccessibleDescription('Manual help. Choose a city. Required city.');
	});
	it('combines explicit disabled and CVA disabled without reopening or accepting edits', async () => {
		const view = await render(SelectionConsumer);
		const host = view.fixture.componentInstance;
		await flush();
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
	it('skips disabled suggestions, closes on Tab without committing, clears and preserves RTL', async () => {
		const view = await render(SelectionConsumer);
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
		expect(input).toHaveAttribute('aria-activedescendant', screen.getByRole('option', { name: 'Nantes' }).id);
		fireEvent.input(input, { target: { value: 'a' } });
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(screen.getByRole('listbox').closest('caps-autocomplete-content')).toHaveAttribute('dir', 'rtl');
		fireEvent.keyDown(input, { key: 'End', keyCode: 35 });
		view.detectChanges();
		fireEvent.keyDown(input, { key: 'Tab', keyCode: 9 });
		view.detectChanges();
		await flush();
		expect(view.fixture.componentInstance.control.value).toBeNull();
		expect(input).toHaveValue('a');
		const clear = screen.getByRole('button', { name: 'Clear text' });
		clear.focus();
		clear.click();
		view.detectChanges();
		await flush();
		expect(document.activeElement).toBe(input);
		expect(input).toHaveValue('');
		expect(view.fixture.componentInstance.search()).toBe('');
	});
	it('accepts arbitrary free text through the explicit Search variant and resolves suggestion labels', async () => {
		const control = new FormControl<string | null>('Initial');
		const label = (item: { name: string }) => item.name;
		const view = await render(
			`<caps-autocomplete-search [formControl]="control" [itemToString]="label"><caps-autocomplete-input aria-label="Tag"/><caps-autocomplete-content><caps-autocomplete-option [value]="tag">Feature</caps-autocomplete-option></caps-autocomplete-content></caps-autocomplete-search>`,
			{
				imports: [...CapsAutocompleteImports, ReactiveFormsModule],
				componentProperties: { control, label, tag: { name: 'Feature' } },
			},
		);
		await flush();
		const input = screen.getByRole('combobox', { name: 'Tag' });
		fireEvent.input(input, { target: { value: 'custom tag' } });
		view.detectChanges();
		await flush();
		expect(control.value).toBe('custom tag');
		fireEvent.click(screen.getByRole('option', { name: 'Feature' }));
		view.detectChanges();
		await flush();
		expect(control.value).toBe('Feature');
		expect(input).toHaveValue('Feature');
	});
	it('autohighlights the first matching option and announces an empty result outside the listbox', async () => {
		const view = await render(SelectionConsumer);
		view.fixture.componentInstance.highlight.set(true);
		view.detectChanges();
		await flush();
		const input = screen.getByRole('combobox');
		fireEvent.input(input, { target: { value: 'Pa' } });
		view.detectChanges();
		await flush();
		view.detectChanges();
		expect(screen.getByRole('option', { name: 'Paris' })).toHaveAttribute('data-highlighted');
		fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
		view.detectChanges();
		await flush();
		expect(view.fixture.componentInstance.control.value).toBe('Paris');
		fireEvent.input(input, { target: { value: 'unknown' } });
		view.detectChanges();
		await flush();
		view.detectChanges();
		const empty = screen.getByRole('status');
		expect(empty).toHaveTextContent('No cities.');
		expect(empty.closest('[role=listbox]')).toBeNull();
	});
});
