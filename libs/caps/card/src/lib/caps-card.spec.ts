import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsCardImports } from '../index';

@Component({
	selector: 'caps-card-test',
	imports: [CapsCardImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-card [size]="size()" class="w-full">
			<caps-card-header>
				<caps-card-title [level]="level()" class="text-2xl">
					Workspace
					<span>settings</span>
				</caps-card-title>
				<caps-card-description>Manage your workspace.</caps-card-description>
				<caps-card-action><button type="button" (click)="actions = actions + 1">Help</button></caps-card-action>
			</caps-card-header>
			<caps-card-content>
				<label>
					Name
					<input />
				</label>
			</caps-card-content>
			<caps-card-footer><a href="/documents">Documents</a></caps-card-footer>
		</caps-card>
	`,
})
class CardHost {
	public readonly size = signal<'default' | 'sm'>('default');
	public readonly level = signal<1 | 2 | 3 | 4 | 5 | 6>(2);
	public actions = 0;
}

describe('CapsCard composition', () => {
	it('preserves native heading levels, projected content, and generic container semantics', () => {
		const fixture = TestBed.createComponent(CardHost);
		fixture.detectChanges();
		const root: HTMLElement = fixture.nativeElement;
		expect(root.querySelector('caps-card')?.hasAttribute('role')).toBe(false);
		for (const level of [1, 2, 3, 4, 5, 6] as const) {
			fixture.componentInstance.level.set(level);
			fixture.detectChanges();
			const heading = root.querySelector(`h${level}`);
			expect(heading?.textContent?.trim()).toBe('Workspace settings');
			expect(root.querySelectorAll('h1,h2,h3,h4,h5,h6')).toHaveLength(1);
			expect(root.querySelector('caps-card-title')?.getAttribute('role')).toBeNull();
		}
	});
	it('keeps size and consumer classes without replacing native actions or form controls', () => {
		const fixture = TestBed.createComponent(CardHost);
		fixture.detectChanges();
		const root: HTMLElement = fixture.nativeElement;
		fixture.componentInstance.size.set('sm');
		fixture.detectChanges();
		expect(root.querySelector('caps-card')?.getAttribute('data-size')).toBe('sm');
		expect(root.querySelector('caps-card-title')?.classList.contains('text-2xl')).toBe(true);
		root.querySelector('button')?.click();
		expect(fixture.componentInstance.actions).toBe(1);
		const input = root.querySelector('input');
		root.querySelector('label')?.click();
		expect(document.activeElement).toBe(input);
		expect(root.querySelector('a')?.getAttribute('href')).toBe('/documents');
		expect(root.querySelector('button button,a a,label label')).toBeNull();
	});
});
