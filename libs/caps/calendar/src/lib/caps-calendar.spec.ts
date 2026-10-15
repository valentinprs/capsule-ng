import { Dir } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { userEvent } from '@vitest/browser/context';
import axe from 'axe-core';
import {
	CapsCalendarImports,
	CapsJalaliDateAdapter,
	JalaliDate,
	injectCapsCalendarI18n,
	provideCapsCalendarI18n,
	provideCapsDateAdapter,
	provideCapsUtcDateAdapter,
} from '../index';

@Component({
	imports: [CapsCalendarImports, Dir],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<section [dir]="direction()">
			<caps-calendar
				[(date)]="date"
				[min]="min"
				[max]="max"
				[disabled]="disabled()"
				[dateDisabled]="dateDisabled"
				[highlightDays]="highlights"
				[weekStartsOn]="1"
				[captionLayout]="caption()"
			/>
		</section>
	`,
})
class SingleHost {
	public readonly date = signal<Date | undefined>(new Date(2026, 9, 7));
	public readonly disabled = signal(false);
	public readonly direction = signal<'ltr' | 'rtl'>('ltr');
	public readonly caption = signal<'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years'>('label');
	public readonly min = new Date(2026, 8, 1);
	public readonly max = new Date(2026, 10, 30);
	public readonly highlights = [new Date(2026, 9, 9)];
	public readonly dateDisabled = (d: Date) => d.getDay() === 0 || d.getDay() === 6;
}
@Component({
	imports: [CapsCalendarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-calendar-multi [(date)]="dates" [minSelection]="1" [maxSelection]="2" [defaultFocusedDate]="focus" />
		<caps-calendar-range [(startDate)]="start" [(endDate)]="end" [defaultFocusedDate]="focus" />
		<caps-month-year-calendar [(date)]="month" [defaultFocusedDate]="focus" view="month" />
	`,
})
class ModesHost {
	public readonly dates = signal<Date[]>([new Date(2026, 9, 7)]);
	public readonly start = signal<Date | undefined>(undefined);
	public readonly end = signal<Date | undefined>(undefined);
	public readonly month = signal<Date | undefined>(undefined);
	public readonly focus = new Date(2026, 9, 7);
}
@Component({
	imports: [CapsCalendarImports],
	providers: [
		provideCapsDateAdapter(CapsJalaliDateAdapter),
		provideCapsCalendarI18n({ formatHeader: (m, y) => `${m + 1}/${y}` }),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-calendar [(date)]="date" />
	`,
})
class JalaliHost {
	public readonly date = signal<JalaliDate | undefined>(new JalaliDate(1405, 7, 15));
}
function setup<T>(host: new (...args: never[]) => T) {
	const fixture = TestBed.createComponent(host);
	fixture.detectChanges();
	return fixture;
}
function cell(root: HTMLElement, day: number) {
	return Array.from(root.querySelectorAll<HTMLButtonElement>('button[role=gridcell]')).find(
		(b) => b.textContent?.trim() === String(day) && !b.hasAttribute('data-outside'),
	)!;
}
it('owns native controls, named grid/full-date cells, highlights, Monday first and an accessible tree', async () => {
	const f = setup(SingleHost);
	const root: HTMLElement = f.nativeElement;
	expect(root.querySelector('[role=grid]')?.getAttribute('aria-label')).toMatch(/October.*2026/);
	expect(cell(root, 7).getAttribute('aria-label')).toContain('Wednesday, 7 Oct 2026');
	expect(cell(root, 9).hasAttribute('data-highlighted')).toBe(true);
	expect(root.querySelector('th')?.textContent?.trim()).toBe('Mo');
	expect(Array.from(root.querySelectorAll<HTMLButtonElement>('button')).every((b) => b.type === 'button')).toBe(true);
	expect(root.querySelector('caps-calendar')?.hasAttribute('role')).toBe(false);
	expect((await axe.run(root, { rules: { region: { enabled: false } } })).violations).toEqual([]);
});
it('selects two-way, preserves disabled weekends and boundaries and blocks all day activation when disabled', async () => {
	const f = setup(SingleHost);
	const root: HTMLElement = f.nativeElement;
	await userEvent.click(cell(root, 9));
	f.detectChanges();
	expect(f.componentInstance.date()?.getDate()).toBe(9);
	expect(cell(root, 10).disabled).toBe(true);
	cell(root, 10).click();
	f.detectChanges();
	expect(f.componentInstance.date()?.getDate()).toBe(9);
	f.componentInstance.disabled.set(true);
	f.detectChanges();
	expect(Array.from(root.querySelectorAll<HTMLButtonElement>('button[role=gridcell]')).every((b) => b.disabled)).toBe(
		true,
	);
	cell(root, 8).click();
	expect(f.componentInstance.date()?.getDate()).toBe(9);
});
it('moves focus with arrows/Home/End/Page keys and activates from the keyboard', async () => {
	const f = setup(SingleHost);
	const root: HTMLElement = f.nativeElement;
	cell(root, 7).focus();
	await userEvent.keyboard('{ArrowRight}');
	f.detectChanges();
	expect(document.activeElement).toBe(cell(root, 8));
	await userEvent.keyboard('{Enter}');
	f.detectChanges();
	expect(f.componentInstance.date()?.getDate()).toBe(8);
	await userEvent.keyboard('{Home}');
	f.detectChanges();
	expect(document.activeElement).toBe(cell(root, 1));
	await userEvent.keyboard('{End}');
	f.detectChanges();
	// October31 is disabled, so Brain retains the last enabled focused day.
	expect(document.activeElement).toBe(cell(root, 1));
	await userEvent.keyboard('{PageUp}');
	f.detectChanges();
	expect(root.querySelector('[role=grid]')?.getAttribute('aria-label')).toMatch(/September/);
	await userEvent.keyboard('{PageDown}');
	f.detectChanges();
	expect(root.querySelector('[role=grid]')?.getAttribute('aria-label')).toMatch(/October/);
	await userEvent.keyboard('{ArrowDown}');
	f.detectChanges();
	expect(document.activeElement).toBe(cell(root, 8));
	await userEvent.keyboard('{ArrowUp}');
	f.detectChanges();
	expect(document.activeElement).toBe(cell(root, 1));
	await userEvent.keyboard(' ');
	f.detectChanges();
	expect(f.componentInstance.date()?.getDate()).toBe(1);
});
it('reverses horizontal arrows in RTL and respects min/max month navigation', async () => {
	const f = setup(SingleHost);
	const root: HTMLElement = f.nativeElement;
	f.componentInstance.direction.set('rtl');
	f.detectChanges();
	cell(root, 7).focus();
	await userEvent.keyboard('{ArrowRight}');
	f.detectChanges();
	expect(document.activeElement).toBe(cell(root, 6));
	await userEvent.keyboard('{ArrowLeft}');
	f.detectChanges();
	const previous = root.querySelector<HTMLButtonElement>('[brnCalendarPreviousButton]')!;
	previous.click();
	f.detectChanges();
	expect(root.querySelector('[role=grid]')?.getAttribute('aria-label')).toMatch(/September/);
	expect(previous.getAttribute('aria-disabled')).toBe('true');
	previous.click();
	f.detectChanges();
	expect(root.querySelector('[role=grid]')?.getAttribute('aria-label')).toMatch(/September/);
});
it('limits multiple selection and toggles without violating minSelection', async () => {
	const f = setup(ModesHost);
	const root = f.nativeElement.querySelector('caps-calendar-multi');
	expect(root.querySelector('[role=grid]').getAttribute('aria-multiselectable')).toBe('true');
	cell(root, 7).click();
	f.detectChanges();
	expect(f.componentInstance.dates()).toHaveLength(1);
	cell(root, 8).click();
	f.detectChanges();
	expect(f.componentInstance.dates().map((d) => d.getDate())).toEqual([7, 8]);
	cell(root, 9).click();
	f.detectChanges();
	expect(f.componentInstance.dates().map((d) => d.getDate())).toEqual([9]);
	cell(root, 8).click();
	f.detectChanges();
	cell(root, 9).click();
	f.detectChanges();
	expect(f.componentInstance.dates().map((d) => d.getDate())).toEqual([8]);
});
it('selects a range, marks endpoints/interior and starts a new range after completion', async () => {
	const f = setup(ModesHost);
	const root = f.nativeElement.querySelector('caps-calendar-range');
	expect(root.querySelector('[role=grid]').getAttribute('aria-multiselectable')).toBe('true');
	cell(root, 7).click();
	f.detectChanges();
	expect(f.componentInstance.start()?.getDate()).toBe(7);
	cell(root, 12).click();
	f.detectChanges();
	expect(f.componentInstance.end()?.getDate()).toBe(12);
	expect(cell(root, 7).getAttribute('data-range-start')).toBe('true');
	expect(cell(root, 9).getAttribute('data-range-middle')).toBe('true');
	expect(cell(root, 12).getAttribute('data-range-end')).toBe('true');
	cell(root, 15).click();
	f.detectChanges();
	expect(f.componentInstance.start()?.getDate()).toBe(15);
	expect(f.componentInstance.end()).toBeUndefined();
});
it('owns valid month/year grid rows, selects a month and switches year/month views', async () => {
	const f = setup(ModesHost);
	const root: HTMLElement = f.nativeElement.querySelector('caps-month-year-calendar');
	expect(root.querySelectorAll('[role=row]')).toHaveLength(3);
	const nov = Array.from(root.querySelectorAll<HTMLButtonElement>('[role=gridcell]')).find(
		(b) => b.textContent?.trim() === 'Nov',
	)!;
	await userEvent.click(nov);
	f.detectChanges();
	expect(f.componentInstance.month()?.getMonth()).toBe(10);
	expect(f.componentInstance.month()?.getDate()).toBe(1);
	root.querySelector<HTMLButtonElement>('[brnMonthYearCalendarHeader]')!.click();
	f.detectChanges();
	expect(root.querySelectorAll('[brnMonthYearCalendarYearButton]').length).toBeGreaterThan(4);
	const year = Array.from(root.querySelectorAll<HTMLButtonElement>('[role=gridcell]')).find(
		(b) => b.textContent?.trim() === '2027',
	)!;
	year.click();
	f.detectChanges();
	expect(root.querySelectorAll('[brnMonthYearCalendarMonthButton]')).toHaveLength(12);
	expect((await axe.run(root, { rules: { region: { enabled: false } } })).violations).toEqual([]);
});
it('uses public runtime i18n without changing selected values', () => {
	TestBed.configureTestingModule({ providers: [provideCapsCalendarI18n({ formatHeader: (m, y) => `${m + 1}/${y}` })] });
	const f = setup(SingleHost);
	const root: HTMLElement = f.nativeElement;
	expect(root.querySelector('[role=grid]')?.getAttribute('aria-label')).toBe('10/2026');
	const i18n = TestBed.runInInjectionContext(() => injectCapsCalendarI18n());
	i18n.use({ formatHeader: (m, y) => `${y} mois ${m + 1}`, labelNext: () => 'Mois suivant' });
	f.detectChanges();
	expect(root.querySelector('[role=grid]')?.getAttribute('aria-label')).toBe('2026 mois 10');
	expect(root.querySelector('[brnCalendarNextButton]')?.getAttribute('aria-label')).toBe('Mois suivant');
	expect(f.componentInstance.date()?.getDate()).toBe(7);
});
it('supports the public UTC and Jalali adapters with their typed date values', () => {
	TestBed.configureTestingModule({ providers: [provideCapsUtcDateAdapter()] });
	const f = setup(SingleHost);
	cell(f.nativeElement, 8).click();
	f.detectChanges();
	expect(f.componentInstance.date()?.getUTCDate()).toBe(8);
	TestBed.resetTestingModule();
	const j = setup(JalaliHost);
	expect(j.nativeElement.querySelector('[role=grid]')?.getAttribute('aria-label')).toBe('7/1405');
	cell(j.nativeElement, 16).click();
	j.detectChanges();
	expect(j.componentInstance.date()).toBeInstanceOf(JalaliDate);
	expect(j.componentInstance.date()?.day).toBe(16);
});
it('uses Capsule month/year selectors and keeps the grid named', async () => {
	const f = setup(SingleHost);
	const root: HTMLElement = f.nativeElement;
	f.componentInstance.caption.set('dropdown');
	f.detectChanges();
	expect(root.querySelectorAll('caps-select')).toHaveLength(2);
	const month = root.querySelector<HTMLButtonElement>('caps-select button[aria-label=Month]')!;
	await userEvent.click(month);
	f.detectChanges();
	const sept = Array.from(document.querySelectorAll<HTMLElement>('caps-select-option')).find(
		(b) => b.textContent?.trim() === 'Sep',
	)!;
	await userEvent.click(sept);
	f.detectChanges();
	expect(root.querySelector('[role=grid]')?.getAttribute('aria-label')).toMatch(/September/);
	expect(f.componentInstance.date()?.getMonth()).toBe(9);
});

@Component({
	imports: [CapsCalendarImports],
	providers: [provideCapsCalendarI18n({ years: () => [2024, 2025, 2026] })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-calendar [(date)]="date" captionLayout="dropdown" />
	`,
})
class ClampHost {
	public readonly date = signal<Date | undefined>(new Date(2024, 0, 31));
}
it('clamps the 31st on month selection and February29 on year selection through the public selectors', async () => {
	const f = setup(ClampHost);
	const root: HTMLElement = f.nativeElement;
	await userEvent.click(root.querySelector<HTMLButtonElement>('caps-select button[aria-label=Month]')!);
	f.detectChanges();
	await userEvent.click(
		Array.from(document.querySelectorAll<HTMLElement>('caps-select-option')).find(
			(o) => o.textContent?.trim() === 'Feb',
		)!,
	);
	f.detectChanges();
	expect(root.querySelector('[role=grid]')?.getAttribute('aria-label')).toMatch(/February 2024/);
	expect(root.querySelector('[role=gridcell][tabindex="0"]')?.textContent?.trim()).toBe('29');
	await userEvent.click(root.querySelector<HTMLButtonElement>('caps-select button[aria-label=Year]')!);
	f.detectChanges();
	await userEvent.click(
		Array.from(document.querySelectorAll<HTMLElement>('caps-select-option')).find(
			(o) => o.textContent?.trim() === '2025',
		)!,
	);
	f.detectChanges();
	expect(root.querySelector('[role=grid]')?.getAttribute('aria-label')).toMatch(/February 2025/);
	expect(root.querySelector('[role=gridcell][tabindex="0"]')?.textContent?.trim()).toBe('28');
	expect(f.componentInstance.date()?.getDate()).toBe(31);
});
