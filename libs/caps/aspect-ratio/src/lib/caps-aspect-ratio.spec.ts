import { TestBed } from '@angular/core/testing';
import { CapsAspectRatio } from '../index';

describe('CapsAspectRatio', () => {
	it.each([
		[16 / 9, 16 / 9],
		['16/9', 16 / 9],
		[' 1.5 / 0.5 ', 3],
		['1', 1],
		[0, 1],
		[-1, 1],
		[NaN, 1],
		[Infinity, 1],
		['1/0', 1],
		['-2/-1', 1],
		['1/2/3', 1],
		['invalid', 1],
		[undefined, 1],
	])('normalizes %s to %s without invalid CSS', (input, expected) => {
		const fixture = TestBed.createComponent(CapsAspectRatio);
		fixture.componentRef.setInput('ratio', input);
		fixture.detectChanges();
		expect(fixture.componentInstance.ratio()).toBe(expected);
		expect(Number.parseFloat(fixture.nativeElement.style.aspectRatio)).toBeCloseTo(expected);
	});
	it('defaults to a square and responds to ratio updates without browser measurements', () => {
		const fixture = TestBed.createComponent(CapsAspectRatio);
		fixture.detectChanges();
		expect(Number.parseFloat(fixture.nativeElement.style.aspectRatio)).toBe(1);
		fixture.componentRef.setInput('ratio', 3 / 4);
		fixture.detectChanges();
		expect(Number.parseFloat(fixture.nativeElement.style.aspectRatio)).toBe(0.75);
		expect(fixture.nativeElement.hasAttribute('role')).toBe(false);
	});
});
