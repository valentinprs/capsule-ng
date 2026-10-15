import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsPaginationImports, CapsPaginationNext, CapsPaginationPrevious } from '../index';
@Component({
	selector: 'caps-pagination-test',
	imports: [CapsPaginationImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-pagination aria-label="Invoice pages">
			<a capsPaginationPrevious href="#previous" [disabled]="disabled()">Previous</a>
			<a capsPaginationLink href="#two" target="_blank" [isActive]="true">2</a>
			<button type="button" capsPaginationNext [disabled]="disabled()" (click)="actions.set(actions() + 1)">
				Next
			</button>
			<caps-pagination-ellipsis />
		</caps-pagination>
		<caps-numbered-pagination [(currentPage)]="page" [(itemsPerPage)]="pageSize" [totalDataLength]="total()" />
	`,
})
class PaginationHost {
	public readonly disabled = signal(true);
	public readonly actions = signal(0);
	public readonly page = signal(1);
	public readonly pageSize = signal(10);
	public readonly total = signal(100);
}
@Component({
	selector: 'caps-direction-test',
	imports: [CapsPaginationPrevious, CapsPaginationNext],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template:
		'<a capsPaginationPrevious href="#back" disabled>Back</a><button type="button" capsPaginationNext isActive>Next</button>',
})
class DirectionHost {}
describe('CapsPagination public composition', () => {
	it('names the navigation, keeps native URLs and one current page', () => {
		const f = TestBed.createComponent(PaginationHost);
		f.detectChanges();
		const root: HTMLElement = f.nativeElement;
		const nav = root.querySelector('caps-pagination')!;
		expect(nav.getAttribute('role')).toBe('navigation');
		expect(nav.getAttribute('aria-label')).toBe('Invoice pages');
		const active = nav.querySelector('a[aria-current="page"]')!;
		expect(active.getAttribute('href')).toBe('#two');
		expect(active.getAttribute('target')).toBe('_blank');
		const event = new MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true });
		let defaultPreventedByProduct: boolean | undefined;
		const preventRunnerNavigation = (click: Event) => {
			if (click !== event) return;
			// Bubble observes the component's target listeners before this fixture-only guard.
			defaultPreventedByProduct = click.defaultPrevented;
			click.preventDefault();
		};
		root.addEventListener('click', preventRunnerNavigation);
		try {
			active.dispatchEvent(event);
		} finally {
			root.removeEventListener('click', preventRunnerNavigation);
		}
		expect(defaultPreventedByProduct).toBe(false);
		expect(nav.querySelectorAll('a a,button button,a button,button a').length).toBe(0);
	});
	it('uses native disabled buttons and cancels disabled link navigation without invoking actions', () => {
		const f = TestBed.createComponent(PaginationHost);
		f.detectChanges();
		const root: HTMLElement = f.nativeElement;
		const previous = root.querySelector('a')!;
		const next = root.querySelector('button')!;
		expect(next.disabled).toBe(true);
		expect(previous.tabIndex).toBe(-1);
		expect(previous.getAttribute('aria-disabled')).toBe('true');
		const e = new MouseEvent('click', { bubbles: true, cancelable: true });
		previous.dispatchEvent(e);
		expect(e.defaultPrevented).toBe(true);
		next.click();
		expect(f.componentInstance.actions()).toBe(0);
		f.componentInstance.disabled.set(false);
		f.detectChanges();
		next.focus();
		expect(document.activeElement).toBe(next);
		next.click();
		expect(f.componentInstance.actions()).toBe(1);
		expect(previous.hasAttribute('aria-disabled')).toBe(false);
	});
	it('changes pages with real native actions, preserves focus and clamps bounds when data shrinks', () => {
		const f = TestBed.createComponent(PaginationHost);
		f.detectChanges();
		const root: HTMLElement = f.nativeElement;
		const numbered = root.querySelector('caps-numbered-pagination')!;
		const next = numbered.querySelector<HTMLButtonElement>('button[capsPaginationNext]')!;
		next.focus();
		next.click();
		f.detectChanges();
		expect(f.componentInstance.page()).toBe(2);
		expect(document.activeElement).toBe(next);
		expect(numbered.querySelector('[aria-current="page"]')?.textContent?.trim()).toBe('2');
		f.componentInstance.page.set(10);
		f.detectChanges();
		expect(next.disabled).toBe(true);
		f.componentInstance.total.set(0);
		f.detectChanges();
		expect(f.componentInstance.page()).toBe(1);
		expect(numbered.querySelector<HTMLButtonElement>('button[capsPaginationPrevious]')?.disabled).toBe(true);
	});
	it('selects a new page size through the public Select and resets the current page', async () => {
		const f = TestBed.createComponent(PaginationHost);
		f.detectChanges();
		f.componentInstance.page.set(4);
		f.detectChanges();
		const root: HTMLElement = f.nativeElement;
		root.querySelector<HTMLButtonElement>('caps-numbered-pagination caps-select button')!.click();
		f.detectChanges();
		await f.whenStable();
		const option = [...document.querySelectorAll<HTMLElement>('caps-select-option')].find((el) =>
			el.textContent?.trim().startsWith('20'),
		);
		expect(option).toBeDefined();
		option!.click();
		f.detectChanges();
		await f.whenStable();
		expect(f.componentInstance.pageSize()).toBe(20);
		expect(f.componentInstance.page()).toBe(1);
		expect(root.querySelector('caps-numbered-pagination')?.textContent).toContain('5 pages');
	});
	it('composes each named directional directive independently with the native action behavior', () => {
		const f = TestBed.createComponent(DirectionHost);
		f.detectChanges();
		const root: HTMLElement = f.nativeElement;
		expect(root.querySelector('a')?.getAttribute('aria-disabled')).toBe('true');
		expect(root.querySelector('a')?.classList.contains('caps-button')).toBe(true);
		expect(root.querySelector('button')?.getAttribute('aria-current')).toBe('page');
	});
});
