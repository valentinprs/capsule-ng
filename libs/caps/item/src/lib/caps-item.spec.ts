import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { CapsItemImports } from '../index';

@Component({
	selector: 'caps-item-test',
	imports: [CapsItemImports, CapsBadgeImports, CapsAvatarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-item-group label="People" labelId="people-label" [size]="size()" [kind]="kind()" [isInset]="true">
			<button capsItemGroupAction type="button">Add person</button>
			<caps-item [disabled]="disabled()">
				<caps-item-media>
					<caps-avatar><caps-avatar-fallback>AM</caps-avatar-fallback></caps-avatar>
				</caps-item-media>
				<caps-item-content>
					<caps-item-title>Alice Martin</caps-item-title>
					<caps-item-description>Designer</caps-item-description>
				</caps-item-content>
				<caps-item-actions>
					<caps-badge variant="green">Member</caps-badge>
					<button type="button" (click)="actions = actions + 1">Invite</button>
				</caps-item-actions>
			</caps-item>
			<caps-item>
				<a capsItem href="#alice" [disabled]="disabled()" (click)="links = links + 1">
					<caps-item-content><caps-item-title>Alice's profile</caps-item-title></caps-item-content>
				</a>
			</caps-item>
			<caps-item>
				<button capsItem type="button" [disabled]="disabled()" (click)="buttons = buttons + 1">Select Alice</button>
			</caps-item>
		</caps-item-group>
	`,
})
class ItemHost {
	public readonly disabled = signal(false);
	public readonly size = signal<'sm' | 'md' | 'lg' | 'xl'>('lg');
	public readonly kind = signal<'on-page' | 'disclosed'>('on-page');
	public actions = 0;
	public links = 0;
	public buttons = 0;
}

@Component({
	selector: 'caps-item-unlabelled-test',
	imports: [CapsItemImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template:
		'<caps-item-group><button capsItemGroupAction type="button">Add</button><caps-item>One</caps-item></caps-item-group>',
})
class UnlabelledHost {}

describe('CapsItem public composition', () => {
	it('names the list and keeps listitem, link, button and independent action semantics', () => {
		const fixture = TestBed.createComponent(ItemHost);
		fixture.detectChanges();
		const root: HTMLElement = fixture.nativeElement;
		const list = root.querySelector('[role=list]');
		expect(list?.getAttribute('aria-labelledby')).toBe('people-label');
		expect(list?.querySelectorAll('[role=listitem]')).toHaveLength(3);
		expect(root.querySelector('a')?.hasAttribute('role')).toBe(false);
		expect(root.querySelector('a')?.getAttribute('href')).toBe('#alice');
		expect(root.querySelector('button button,a a,a button,button a')).toBeNull();
		root.querySelector<HTMLButtonElement>('caps-item-actions button')?.click();
		expect(fixture.componentInstance.actions).toBe(1);
	});
	it('disables native items effectively, while projected actions own their own disabled state', () => {
		const fixture = TestBed.createComponent(ItemHost);
		fixture.componentInstance.disabled.set(true);
		fixture.detectChanges();
		const root: HTMLElement = fixture.nativeElement;
		const link = root.querySelector('a');
		expect(link?.getAttribute('aria-disabled')).toBe('true');
		expect(link?.getAttribute('tabindex')).toBe('-1');
		const event = new MouseEvent('click', { bubbles: true, cancelable: true });
		link?.dispatchEvent(event);
		expect(event.defaultPrevented).toBe(true);
		expect(fixture.componentInstance.links).toBe(0);
		root.querySelector<HTMLButtonElement>('button[capsItem]')?.click();
		expect(fixture.componentInstance.buttons).toBe(0);
		expect(root.querySelector<HTMLButtonElement>('button[capsItem]')?.disabled).toBe(true);
		expect(root.querySelector('caps-item')?.hasAttribute('aria-disabled')).toBe(false);
		root.querySelector<HTMLButtonElement>('caps-item-actions button')?.click();
		expect(fixture.componentInstance.actions).toBe(1);
	});
	it('retains group actions without a label and avoids dangling ARIA references', () => {
		const fixture = TestBed.createComponent(UnlabelledHost);
		fixture.detectChanges();
		const root: HTMLElement = fixture.nativeElement;
		expect(root.querySelector('button')?.textContent).toBe('Add');
		expect(root.querySelector('[role=list]')?.hasAttribute('aria-labelledby')).toBe(false);
	});
});
