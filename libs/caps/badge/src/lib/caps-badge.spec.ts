import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsBadgeImports, type CapsBadgeVariant } from '../index';
@Component({
	selector: 'caps-badge-test',
	imports: [CapsBadgeImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template:
		'<caps-badge [variant]="variant()" [skeleton]="skeleton()"><span aria-hidden="true">●</span>Member</caps-badge><a capsBadge href="#tag">Angular</a>',
})
class BadgeHost {
	public readonly variant = signal<CapsBadgeVariant>('gray');
	public readonly skeleton = signal(false);
}
describe('CapsBadge public composition', () => {
	it('projects status content, updates Carbon variants and keeps native links', () => {
		const fixture = TestBed.createComponent(BadgeHost);
		fixture.detectChanges();
		const root: HTMLElement = fixture.nativeElement;
		const badge = root.querySelector('caps-badge');
		expect(badge?.getAttribute('data-size')).toBe('md');
		expect(badge?.textContent).toContain('Member');
		for (const value of [
			'primary',
			'secondary',
			'ghost',
			'destructive',
			'red',
			'magenta',
			'purple',
			'blue',
			'cyan',
			'teal',
			'green',
			'gray',
			'cool-gray',
			'warm-gray',
			'high-contrast',
			'outline',
		] as const) {
			fixture.componentInstance.variant.set(value);
			fixture.detectChanges();
			expect(badge?.getAttribute('data-variant')).toBe(value);
		}
		expect(root.querySelector('a')?.getAttribute('href')).toBe('#tag');
		expect(root.querySelector('a')?.hasAttribute('role')).toBe(false);
		fixture.componentInstance.skeleton.set(true);
		fixture.detectChanges();
		expect(badge?.getAttribute('aria-busy')).toBe('true');
	});
});
