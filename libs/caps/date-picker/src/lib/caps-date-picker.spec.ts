import { ChangeDetectionStrategy, Component, Injectable, signal, type Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import {
	CapsJalaliDateAdapter,
	JalaliDate,
	provideCapsCalendarI18n,
	provideCapsDateAdapter,
	provideCapsUtcDateAdapter,
} from '@capsule-ng/caps/calendar';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { userEvent } from '@vitest/browser/context';
import axe from 'axe-core';
import {
	CapsDatePicker,
	CapsDatePickerImports,
	CapsDatePickerMulti,
	CapsDateRangePicker,
	provideCapsDatePickerConfig,
} from '../index';

const edit = (d: Date) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
const display = (d: Date) => `Date ${edit(d)}`;
const parse = (s: string) => {
	const parts = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
	if (!parts) return null;
	const d = new Date(+parts[3], +parts[2] - 1, +parts[1]);
	return d.getDate() === +parts[1] && d.getMonth() === +parts[2] - 1 ? d : null;
};
const focus = new Date(2026, 9, 7);
@Component({
	imports: [CapsDatePickerImports, CapsFieldImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<main>
			<h1>Date control</h1>
			<div id="outside-picker">Outside picker</div>
			<form [formGroup]="group" (submit)="submits = submits + 1; $event.preventDefault()">
				<caps-field>
					<caps-field-label>Birthday</caps-field-label>
					<caps-date-picker
						[formControl]="control()"
						[autoCloseOnSelect]="true"
						[disabled]="disabled()"
						[formatDate]="display"
						[defaultFocusedDate]="focus"
						captionLayout="dropdown"
						(dateChange)="events.push($event)"
					>
						<caps-date-picker-input
							inputId="birthday"
							[parseDate]="parse"
							[formatInputDate]="edit"
							[inputValue]="raw()"
							aria-describedby="manual"
						/>
					</caps-date-picker>
					<caps-field-description>Choose a day</caps-field-description>
					<caps-field-error validator="required">Required</caps-field-error>
				</caps-field>
				<span id="manual">Manual hint</span>
				<button type="submit">Submit</button>
			</form>
		</main>
	`,
})
class InputHost {
	public readonly control = signal(new FormControl<Date | null>(null, Validators.required));
	public readonly group = new FormGroup({ unrelated: new FormControl('') });
	public readonly disabled = signal(false);
	public readonly raw = signal('');
	public readonly focus = focus;
	public readonly edit = edit;
	public readonly display = display;
	public readonly parse = parse;
	public events: (Date | null)[] = [];
	public submits = 0;
}
@Component({
	imports: [CapsDatePickerImports, CapsFieldImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field class="mx-auto w-fit" [dir]="direction()">
			<caps-field-label>Appointment</caps-field-label>
			<caps-date-picker
				[formControl]="control"
				[align]="align()"
				captionLayout="dropdown"
				[defaultFocusedDate]="focus"
				autoCloseOnSelect
				[dateDisabled]="weekend"
			>
				<caps-date-picker-trigger buttonId="appointment">Pick a day</caps-date-picker-trigger>
			</caps-date-picker>
			<caps-field-description>Office hours</caps-field-description>
			<caps-field-error validator="required">Required</caps-field-error>
		</caps-field>
	`,
})
class TriggerHost {
	public readonly align = signal<'start' | 'center' | 'end'>('center');
	public readonly direction = signal<'ltr' | 'rtl'>('ltr');
	public readonly control = new FormControl<Date | null>(null, Validators.required);
	public readonly focus = focus;
	public readonly weekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;
}
@Component({
	imports: [CapsDatePickerImports, CapsFieldImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form [formGroup]="form">
			<caps-field>
				<caps-field-label>Named date</caps-field-label>
				<caps-date-picker formControlName="named" id="named-date" aria-describedby="named-hint" />
				<span id="named-hint">Hint</span>
			</caps-field>
			<button type="button" id="outside">Outside</button>
		</form>
	`,
})
class NamedHost {
	public readonly form = new FormGroup({ named: new FormControl<Date | null>(null) });
}
@Component({
	imports: [CapsDatePickerImports, CapsFieldImports, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>Model date</caps-field-label>
			<caps-date-picker [(ngModel)]="date" name="model" />
		</caps-field>
	`,
})
class ModelHost {
	public date: Date | null = null;
}
@Component({
	imports: [CapsDatePickerImports, CapsFieldImports, FormField, FormRoot],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form [formRoot]="fields">
			<caps-field>
				<caps-field-label>Signal date</caps-field-label>
				<caps-date-picker [formField]="fields.date" />
				<caps-field-error validator="required">Required</caps-field-error>
			</caps-field>
		</form>
	`,
})
class SignalHost {
	public readonly model = signal<{ date: Date | null }>({ date: null });
	public readonly fields = form(this.model, (p) => required(p.date));
}
@Component({
	imports: [CapsDatePickerImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-date-range-picker [formControl]="range" autoCloseOnEndSelection>
			<caps-date-range-input aria-label="Range" />
		</caps-date-range-picker>
		<caps-date-picker-multi [formControl]="multi" [minSelection]="1" [maxSelection]="2" autoCloseOnMaxSelection>
			<caps-date-multi-input aria-label="Days" />
		</caps-date-picker-multi>
		<caps-month-year-picker [formControl]="month" autoCloseOnSelect>
			<caps-month-year-input aria-label="Month" />
		</caps-month-year-picker>
	`,
})
class ModesHost {
	public readonly range = new FormControl<[Date, Date] | null>([new Date(2026, 9, 7), new Date(2026, 9, 9)]);
	public readonly multi = new FormControl<Date[]>([new Date(2026, 9, 7)], { nonNullable: true });
	public readonly month = new FormControl<Date | null>(null);
}
@Injectable()
class CustomJalaliAdapter extends CapsJalaliDateAdapter {
	public static reads = 0;
	public override getYear(date: JalaliDate): number {
		CustomJalaliAdapter.reads++;
		return super.getYear(date);
	}
}
@Component({
	imports: [CapsDatePickerImports],
	providers: [
		provideCapsDateAdapter(CustomJalaliAdapter),
		provideCapsCalendarI18n({ formatHeader: (m, y) => `${m + 1}/${y}` }),
		provideCapsDatePickerConfig<JalaliDate>({
			formatDate: (d) => `${d.year}/${d.month}/${d.day}`,
			formatInputDate: (d) => `${d.year}/${d.month}/${d.day}`,
			parseDate: () => new JalaliDate(1405, 7, 15),
		}),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-date-picker [(date)]="date" aria-label="Persian day" />
	`,
})
class JalaliHost {
	public date: JalaliDate | null = new JalaliDate(1405, 7, 15);
}

async function setup<T>(host: Type<T>) {
	const f = TestBed.createComponent(host);
	f.detectChanges();
	await f.whenStable();
	return f;
}
async function settle(f: { detectChanges(): void; whenStable(): Promise<unknown> }) {
	f.detectChanges();
	await f.whenStable();
}
function root(f: { nativeElement: HTMLElement }): HTMLElement {
	return f.nativeElement;
}
function native(f: { nativeElement: HTMLElement }) {
	return root(f).querySelector<HTMLInputElement>('input')!;
}
async function type(
	f: { nativeElement: HTMLElement; detectChanges(): void; whenStable(): Promise<unknown> },
	text: string,
) {
	native(f).focus();
	await settle(f);
	await userEvent.fill(native(f), text);
	await settle(f);
}
function day(n: number) {
	return Array.from(document.querySelectorAll<HTMLButtonElement>('button[brnCalendarCellButton]')).find(
		(b) => b.textContent?.trim() === String(n) && !b.hasAttribute('data-outside'),
	)!;
}
async function close(picker: { close(): void }, f: { detectChanges(): void; whenStable(): Promise<unknown> }) {
	picker.close();
	await settle(f);
	await new Promise((resolve) => setTimeout(resolve, 200));
}
afterEach(() => {
	TestBed.resetTestingModule();
});

it('owns one input and automatically relates the real input to Field labels/descriptions without early invalid styling', async () => {
	const f = await setup(InputHost);
	const root: HTMLElement = f.nativeElement;
	const input = native(f);
	expect(root.querySelector('label')?.htmlFor).toBe(input.id);
	expect(input.id).toBe('birthday');
	expect(input.getAttribute('aria-describedby')?.split(' ')).toContain(
		root.querySelector('caps-field-description')!.id,
	);
	expect(input.getAttribute('aria-describedby')?.split(' ')).toContain('manual');
	expect(root.querySelector<HTMLElement>('caps-field-error')?.hidden).toBe(true);
	expect(root.querySelector('caps-field-error')?.textContent?.trim()).toBe('');
	expect(input.getAttribute('aria-invalid')).toBeNull();
	expect(root.querySelector('caps-field')?.getAttribute('data-matches-spartan-invalid')).toBeNull();
	expect(root.querySelectorAll('input')).toHaveLength(1);
	expect(root.querySelector('caps-date-picker')?.hasAttribute('role')).toBe(false);
	await userEvent.click(root.querySelector('label')!);
	expect(document.activeElement).toBe(input);
	input.blur();
	await settle(f);
	expect(f.componentInstance.control().touched).toBe(true);
	expect(input.getAttribute('aria-invalid')).toBe('true');
	expect(input.getAttribute('aria-describedby')?.split(' ')).toContain(root.querySelector('caps-field-error')!.id);
	expect((await axe.run(root)).violations).toEqual([]);
});
it('keeps raw typing and parent inputValue separate from model commits, including caret edits', async () => {
	const f = await setup(InputHost);
	const input = native(f);
	await type(f, '7/10/2026');
	expect(f.componentInstance.control().value).toBeNull();
	input.setSelectionRange(1, 1);
	await userEvent.keyboard('9');
	await settle(f);
	expect(input.selectionStart).toBe(2);
	expect(input.value).toBe('79/10/2026');
	f.componentInstance.raw.set('8/10/2026');
	await settle(f);
	expect(input.value).toBe('8/10/2026');
	input.blur();
	await settle(f);
	expect(f.componentInstance.control().value?.getDate()).toBe(8);
	expect(input.value).toBe('Date 8/10/2026');
	input.focus();
	await settle(f);
	expect(input.value).toBe('8/10/2026');
});
it('prevents native submit on Enter, keeps focus/edit format, and retains the committed date on later blur', async () => {
	const f = await setup(InputHost);
	const input = native(f);
	await type(f, '7/10/2026');
	await userEvent.keyboard('{Enter}');
	await settle(f);
	expect(f.componentInstance.submits).toBe(0);
	expect(document.activeElement).toBe(input);
	expect(input.value).toBe('7/10/2026');
	input.blur();
	await settle(f);
	expect(input.value).toBe('Date 7/10/2026');
	expect(f.componentInstance.control().value?.getDate()).toBe(7);
});
it('invalid parse clears the model but keeps raw text, and the clear action empties the native control and marks touched', async () => {
	const f = await setup(InputHost);
	await type(f, '7/10/2026');
	native(f).blur();
	await settle(f);
	await type(f, 'not a date');
	native(f).blur();
	await settle(f);
	expect(f.componentInstance.control().value).toBeNull();
	expect(native(f).value).toBe('not a date');
	await userEvent.click(root(f).querySelector('button[aria-label="Clear date"]')!);
	await settle(f);
	expect(native(f).value).toBe('');
	expect(f.componentInstance.control().touched).toBe(true);
	expect(document.activeElement).toBe(native(f));
});
it('combines CVA and explicit disabled through runtime changes, blocks commits/open/reset, and rebinds the actual control', async () => {
	const f = await setup(InputHost);
	const component = root(f).querySelector('caps-date-picker');
	expect(component).toBeTruthy();
	const p = f.debugElement.query((n) => n.componentInstance instanceof CapsDatePicker)
		.componentInstance as CapsDatePicker<Date>;
	f.componentInstance.control().disable();
	f.componentInstance.disabled.set(true);
	await settle(f);
	f.componentInstance.disabled.set(false);
	await settle(f);
	expect(native(f).disabled).toBe(true);
	expect(Array.from(root(f).querySelectorAll<HTMLButtonElement>('button[aria-label]')).every((b) => b.disabled)).toBe(
		true,
	);
	p.updateDate(focus);
	p.open();
	p.reset();
	await settle(f);
	expect(f.componentInstance.events).toEqual([]);
	expect(document.querySelector('caps-calendar')).toBeNull();
	f.componentInstance.control().enable();
	await settle(f);
	expect(native(f).disabled).toBe(false);
	const next = new FormControl<Date | null>(new Date(2026, 9, 9), Validators.required);
	f.componentInstance.control.set(next);
	await settle(f);
	expect(native(f).value).toBe('Date 9/10/2026');
	expect(f.componentInstance.events).toEqual([]);
	await type(f, '8/10/2026');
	native(f).blur();
	await settle(f);
	expect(next.value?.getDate()).toBe(8);
});
it('isolates invalid month/year selects, marks touched on close, and restores trigger focus after Escape and selection', async () => {
	const f = await setup(TriggerHost);
	const trigger = root(f).querySelector<HTMLButtonElement>('#appointment')!;
	const picker = f.debugElement.query((node) => node.componentInstance instanceof CapsDatePicker)
		.componentInstance as CapsDatePicker<Date>;
	for (const direction of ['ltr', 'rtl'] as const) {
		for (const align of ['start', 'center', 'end'] as const) {
			f.componentInstance.direction.set(direction);
			f.componentInstance.align.set(align);
			await settle(f);
			await userEvent.click(trigger, { timeout: 10000 });
			await settle(f);
			expect(picker.popover().originElement()).toBe(trigger);
			await expect
				.poll(() => {
					const panel = document.querySelector<HTMLElement>('.caps-popover-content');
					if (!panel) return false;
					const control = trigger.getBoundingClientRect();
					const popup = panel.getBoundingClientRect();
					const error =
						align === 'center'
							? popup.left + popup.width / 2 - control.left - control.width / 2
							: (align === 'start') === (direction === 'ltr')
								? popup.left - control.left
								: popup.right - control.right;
					return (
						Math.abs(popup.top - control.bottom - 4) <= 1 &&
						Math.abs(error) <= 1 &&
						getComputedStyle(panel).opacity === '1'
					);
				})
				.toBe(true);
			await userEvent.keyboard('{Escape}');
			await settle(f);
			await expect.poll(() => document.querySelector('.caps-popover-content')).toBeNull();
			expect(document.activeElement).toBe(trigger);
		}
	}
	expect(f.componentInstance.control.touched).toBe(true);
	expect(trigger.getAttribute('aria-invalid')).toBe('true');
	expect(document.activeElement).toBe(trigger);
	await userEvent.click(trigger, { timeout: 10000 });
	await settle(f);
	for (const select of Array.from(document.querySelectorAll('caps-calendar caps-select button'))) {
		expect(select.getAttribute('aria-invalid')).toBeNull();
		expect(select.getAttribute('data-matches-spartan-invalid')).toBeNull();
	}
	expect(day(10).disabled).toBe(true);
	await userEvent.click(day(9));
	await settle(f);
	await new Promise((r) => setTimeout(r, 200));
	expect(f.componentInstance.control.value?.getDate()).toBe(9);
	expect(document.activeElement).toBe(trigger);
});
it('navigates with real arrows/Page keys/Space and restores native focus after selection, public close and outside click', async () => {
	const f = await setup(InputHost);
	native(f).focus();
	await userEvent.keyboard('{ArrowDown}');
	await settle(f);
	expect(document.querySelector('caps-calendar')).not.toBeNull();
	expect(document.querySelector('caps-calendar')?.closest('[role="dialog"]')?.getAttribute('aria-label')).toBe(
		'Birthday',
	);
	const cursor = document.querySelector<HTMLButtonElement>('caps-calendar button[role="gridcell"][tabindex="0"]')!;
	cursor.focus();
	await userEvent.keyboard('{ArrowRight}{PageUp}');
	await settle(f);
	expect(document.querySelector('caps-calendar [role="grid"]')?.getAttribute('aria-label')).toContain('September');
	await userEvent.keyboard('{PageDown}');
	await settle(f);
	expect(document.querySelector('caps-calendar [role="grid"]')?.getAttribute('aria-label')).toContain('October');
	await userEvent.keyboard(' ');
	await settle(f);
	expect(f.componentInstance.control().value?.getDate()).toBe(8);
	expect(document.querySelector('caps-calendar')).toBeNull();
	await userEvent.keyboard('{ArrowDown}');
	await settle(f);
	const p = f.debugElement.query((n) => n.componentInstance instanceof CapsDatePicker)
		.componentInstance as CapsDatePicker<Date>;
	await close(p, f);
	expect(document.activeElement).toBe(native(f));
	await userEvent.keyboard('{ArrowDown}');
	await settle(f);
	const outside = root(f).querySelector<HTMLElement>('#outside-picker')!;
	const bounds = outside.getBoundingClientRect();
	expect(document.elementFromPoint(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2)).toBe(outside);
	await userEvent.click(outside);
	await settle(f);
	await new Promise((r) => setTimeout(r, 200));
	expect(document.querySelector('caps-calendar')).toBeNull();
	expect(document.activeElement).toBe(native(f));
});
it('supports template-driven forms with the default owned native input', async () => {
	const f = await setup(ModelHost);
	await type(f, 'October 7, 2026');
	native(f).blur();
	await settle(f);
	expect(f.componentInstance.date?.getDate()).toBe(7);
	const label = root(f).querySelector<HTMLLabelElement>('label')!;
	expect(label.htmlFor).toBe(native(f).id);
});
it('supports signal Forms through the picker CVA and the default control', async () => {
	const f = await setup(SignalHost);
	await type(f, 'October 8, 2026');
	native(f).blur();
	await settle(f);
	expect(f.componentInstance.model().date?.getDate()).toBe(8);
	expect(f.componentInstance.fields.date().touched()).toBe(true);
});
it('does not emit on writeValue, applies the typed transform and synchronizes a reset', async () => {
	TestBed.configureTestingModule({
		providers: [
			provideCapsDatePickerConfig<Date>({
				transformDate: (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()),
				formatDate: display,
				formatInputDate: edit,
				parseDate: parse,
			}),
		],
	});
	const f = await setup(ModelHost);
	const p = f.debugElement.query((n) => n.componentInstance instanceof CapsDatePicker)
		.componentInstance as CapsDatePicker<Date>;
	const events = vi.fn();
	p.dateChange.subscribe(events);
	p.writeValue(new Date(2026, 9, 7, 18));
	await settle(f);
	expect(p.value()?.getHours()).toBe(0);
	expect(events).not.toHaveBeenCalled();
	p.reset();
	await settle(f);
	expect(native(f).value).toBe('');
	expect(events).toHaveBeenCalledWith(null);
});
it('retains complete range values while editing a partial draft and restores the previous range on close', async () => {
	const f = await setup(ModesHost);
	const p = f.debugElement.query((n) => n.componentInstance instanceof CapsDateRangePicker)
		.componentInstance as CapsDateRangePicker<Date>;
	const input = root(f).querySelector<HTMLInputElement>('caps-date-range-input input')!;
	input.focus();
	await userEvent.keyboard('{ArrowDown}');
	await settle(f);
	await userEvent.click(day(12), { timeout: 10000 });
	await settle(f);
	expect(f.componentInstance.range.value?.[0].getDate()).toBe(7);
	expect(f.componentInstance.range.value?.[1].getDate()).toBe(9);
	await close(p, f);
	expect(p.formattedDate()).toContain('Oct 07');
	expect(p.formattedDate()).toContain('Oct 09');
});
it('keeps multi cardinality/auto-close and emits an empty array when cleared', async () => {
	const f = await setup(ModesHost);
	const p = f.debugElement.query((n) => n.componentInstance instanceof CapsDatePickerMulti)
		.componentInstance as CapsDatePickerMulti<Date>;
	const input = root(f).querySelector<HTMLInputElement>('caps-date-multi-input input')!;
	input.focus();
	await userEvent.keyboard('{ArrowDown}');
	await settle(f);
	await userEvent.click(day(8));
	await settle(f);
	await new Promise((r) => setTimeout(r, 200));
	expect(f.componentInstance.multi.value).toHaveLength(2);
	expect(document.querySelector('caps-calendar-multi')).toBeNull();
	p.updateDate(null);
	await settle(f);
	expect(f.componentInstance.multi.value).toEqual([]);
});
it('parses month/year values through the Brain edit cycle and clears invalid raw text without losing it', async () => {
	const f = await setup(ModesHost);
	const input = root(f).querySelector<HTMLInputElement>('caps-month-year-input input')!;
	await userEvent.fill(input, '10/2026');
	await userEvent.keyboard('{Enter}');
	await settle(f);
	input.blur();
	await settle(f);
	expect(f.componentInstance.month.value?.getMonth()).toBe(9);
	expect(input.value).toBe('10/2026');
	await userEvent.fill(input, '13/2026');
	input.blur();
	await settle(f);
	expect(f.componentInstance.month.value).toBeNull();
	expect(input.value).toBe('13/2026');
});
it('keeps Jalali values and the public custom adapter/provider contract generic', async () => {
	CustomJalaliAdapter.reads = 0;
	const f = await setup(JalaliHost);
	expect(native(f).value).toBe('1405/7/15');
	await type(f, '1405/7/15');
	native(f).blur();
	await settle(f);
	expect(f.componentInstance.date).toBeInstanceOf(JalaliDate);
	native(f).focus();
	await userEvent.keyboard('{ArrowDown}');
	await settle(f);
	expect(CustomJalaliAdapter.reads).toBeGreaterThan(0);
	await userEvent.click(day(16), { timeout: 10000 });
	await settle(f);
	expect(f.componentInstance.date).toBeInstanceOf(JalaliDate);
	expect(f.componentInstance.date?.day).toBe(16);
	const p = f.debugElement.query((n) => n.componentInstance instanceof CapsDatePicker)
		.componentInstance as CapsDatePicker<JalaliDate>;
	await close(p, f);
});
it('accepts the UTC adapter without converting the typed selected value', async () => {
	TestBed.configureTestingModule({ providers: [provideCapsUtcDateAdapter()] });
	const f = await setup(ModelHost);
	const p = f.debugElement.query((n) => n.componentInstance instanceof CapsDatePicker)
		.componentInstance as CapsDatePicker<Date>;
	p.updateDate(new Date(Date.UTC(2026, 9, 7)));
	await settle(f);
	expect(f.componentInstance.date?.toISOString()).toBe('2026-10-07T00:00:00.000Z');
	native(f).focus();
	await userEvent.keyboard('{ArrowDown}');
	await settle(f);
	await userEvent.click(day(8), { timeout: 10000 });
	await settle(f);
	expect(f.componentInstance.date?.toISOString()).toBe('2026-10-08T00:00:00.000Z');
	await close(p, f);
});

it('supports formControlName and forwards a default control ID/description to the native input', async () => {
	const f = await setup(NamedHost);
	expect(native(f).id).toBe('named-date');
	expect(root(f).querySelector('caps-date-picker')?.hasAttribute('id')).toBe(false);
	expect(root(f).querySelector<HTMLLabelElement>('label')?.htmlFor).toBe('named-date');
	expect(native(f).getAttribute('aria-describedby')?.split(' ')).toContain('named-hint');
	await type(f, 'October 9, 2026');
	native(f).blur();
	await settle(f);
	expect(f.componentInstance.form.controls.named.value?.getDate()).toBe(9);
	f.componentInstance.form.reset();
	await settle(f);
	expect(native(f).value).toBe('');
});
it('closes an open picker when the explicit disabled input changes without enabling a disabled CVA', async () => {
	const f = await setup(InputHost);
	native(f).focus();
	await userEvent.keyboard('{ArrowDown}');
	await settle(f);
	expect(document.querySelector('caps-calendar')).not.toBeNull();
	f.componentInstance.disabled.set(true);
	await settle(f);
	await new Promise((r) => setTimeout(r, 200));
	expect(document.querySelector('caps-calendar')).toBeNull();
	expect(native(f).disabled).toBe(true);
	f.componentInstance.control().disable();
	f.componentInstance.disabled.set(false);
	await settle(f);
	expect(native(f).disabled).toBe(true);
});
