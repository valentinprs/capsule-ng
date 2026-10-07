import { TestBed } from '@angular/core/testing';
import { ChartEmpty } from './chart--empty.example';
import { ChartPreview } from './chart.preview';

describe('ChartPreview', () => {
	it('switches between the desktop and mobile series', async () => {
		const fixture = TestBed.createComponent(ChartPreview);
		fixture.detectChanges();
		await fixture.whenStable();

		const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
		expect(buttons[0]?.textContent).toContain('7,324');
		expect(buttons[1]?.textContent).toContain('7,250');
		expect(buttons[0]?.getAttribute('aria-pressed')).toBe('true');
		expect(fixture.nativeElement.querySelectorAll('tbody tr')).toHaveLength(30);
		expect(fixture.nativeElement.querySelector('caption')?.textContent).toBe('Visitors in April 2024');

		buttons[1]?.click();
		fixture.detectChanges();
		await fixture.whenStable();

		expect(buttons[1]?.getAttribute('aria-pressed')).toBe('true');
		expect(fixture.nativeElement.querySelector('svg')?.getAttribute('aria-label')).toBe('Mobile visitors by day');
	});
});

describe('ChartEmpty', () => {
	it('shows meaningful empty text and restores both the plot and exact values', async () => {
		const fixture = TestBed.createComponent(ChartEmpty);
		fixture.detectChanges();
		await fixture.whenStable();
		expect(fixture.nativeElement.querySelector('caps-chart')).toBeNull();
		expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain('No visitor data');
		const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
		button.click();
		fixture.detectChanges();
		await fixture.whenStable();
		expect(fixture.nativeElement.querySelector('svg')?.getAttribute('aria-label')).toBe('Monthly visits');
		expect(fixture.nativeElement.querySelectorAll('tbody tr')).toHaveLength(3);
		button.click();
		fixture.detectChanges();
		await fixture.whenStable();
		expect(fixture.nativeElement.querySelector('caps-chart')).toBeNull();
	});
});
