import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsSeparatorImports } from '../index';

@Component({
	selector: 'caps-separator-test',
	imports: [CapsSeparatorImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-separator [orientation]="orientation()" [decorative]="decorative()" class="my-4" />
	`,
})
class SeparatorHost {
	public readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
	public readonly decorative = signal(true);
}

describe('CapsSeparator semantics', () => {
	it('delegates decorative and semantic orientations to Brain and never adds a focus stop', () => {
		const fixture = TestBed.createComponent(SeparatorHost);
		fixture.detectChanges();
		const separator: HTMLElement = fixture.nativeElement.querySelector('caps-separator');
		expect(separator.getAttribute('role')).toBe('none');
		expect(separator.getAttribute('aria-orientation')).toBeNull();
		expect(separator.tabIndex).toBe(-1);
		fixture.componentInstance.decorative.set(false);
		fixture.detectChanges();
		expect(separator.getAttribute('role')).toBe('separator');
		expect(separator.getAttribute('aria-orientation')).toBeNull();
		fixture.componentInstance.orientation.set('vertical');
		fixture.detectChanges();
		expect(separator.getAttribute('aria-orientation')).toBe('vertical');
		expect(separator.getAttribute('data-orientation')).toBe('vertical');
		fixture.componentInstance.decorative.set(true);
		fixture.detectChanges();
		expect(separator.getAttribute('role')).toBe('none');
		expect(separator.getAttribute('aria-orientation')).toBeNull();
		expect(separator.classList.contains('my-4')).toBe(true);
	});
});
