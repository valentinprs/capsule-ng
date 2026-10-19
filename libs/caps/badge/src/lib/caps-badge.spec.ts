import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsBadgeImports, type CapsBadgeVariant } from '../index';
@Component({
	selector: 'caps-badge-test',
	imports: [CapsBadgeImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template:
		'<caps-badge [variant]="variant()" [highContrast]="highContrast()" [skeleton]="skeleton()"><span aria-hidden="true">●</span>Member</caps-badge><a capsBadge href="#tag">Angular</a>',
})
class BadgeHost {
	public readonly variant = signal<CapsBadgeVariant>('blue');
	public readonly highContrast = signal(false);
	public readonly skeleton = signal(false);
}
describe('CapsBadge public composition', () => {
	it('projects status content, updates Carbon variants and keeps native links', () => {
		const fixture = TestBed.createComponent(BadgeHost);
		fixture.detectChanges();
		const root: HTMLElement = fixture.nativeElement;
		const badge = root.querySelector('caps-badge');
		expect(badge?.textContent).toContain('Member');
		for (const value of [
			'blue',
			'cool-gray',
			'red',
			'magenta',
			'purple',
			'cyan',
			'orange',
			'yellow',
			'green',
		] as const) {
			fixture.componentInstance.variant.set(value);
			fixture.detectChanges();
			expect(badge?.getAttribute('data-variant')).toBe(value);
		}
		expect(root.querySelector('a')?.getAttribute('href')).toBe('#tag');
		expect(root.querySelector('a')?.hasAttribute('role')).toBe(false);
		expect(badge?.hasAttribute('data-high-contrast')).toBe(false);
		fixture.componentInstance.highContrast.set(true);
		fixture.detectChanges();
		expect(badge?.hasAttribute('data-high-contrast')).toBe(true);
		fixture.componentInstance.skeleton.set(true);
		fixture.detectChanges();
		expect(badge?.getAttribute('aria-busy')).toBe('true');
	});
});
