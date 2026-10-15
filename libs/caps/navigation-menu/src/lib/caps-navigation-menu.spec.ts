import { Dir } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink } from '@angular/router';
import { userEvent } from '@vitest/browser/context';
import axe from 'axe-core';
import { CapsNavigationMenuImports } from '../index';

@Component({
	imports: [CapsNavigationMenuImports, Dir],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form (submit)="submitted = true">
			<section [dir]="direction()">
				<caps-navigation-menu
					[aria-label]="label()"
					[(value)]="value"
					[openOn]="trigger()"
					[delayDuration]="0"
					[orientation]="orientation()"
				>
					<li capsNavigationMenuItem id="docs">
						<button caps-navigation-menu-trigger align="end">Docs</button>
						<ng-template capsNavigationMenuContent [class]="panelClass()">
							<a capsNavigationMenuLink href="/first">First</a>
							<a capsNavigationMenuLink href="/last">Last</a>
						</ng-template>
					</li>
					<li capsNavigationMenuItem>
						<button caps-navigation-menu-trigger [disabled]="disabled()">Disabled</button>
						<ng-template capsNavigationMenuContent>Unavailable</ng-template>
					</li>
					<li capsNavigationMenuItem id="external">
						<a
							capsNavigationMenuLink
							href="https://example.com/"
							target="_blank"
							rel="noopener"
							[active]="current()"
							[disabled]="linkDisabled()"
						>
							External
						</a>
					</li>
				</caps-navigation-menu>
			</section>
			<button type="button">After</button>
		</form>
	`,
})
class Host {
	public readonly value = signal<string | undefined>(undefined);
	public readonly trigger = signal<'click' | 'hover'>('click');
	public readonly direction = signal<'ltr' | 'rtl'>('ltr');
	public readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
	public readonly label = signal('Site');
	public readonly panelClass = signal('test-panel');
	public readonly current = signal(true);
	public readonly disabled = signal(true);
	public readonly linkDisabled = signal(false);
	public submitted = false;
}
const setup = async () => {
	const f = TestBed.createComponent(Host);
	f.detectChanges();
	await settle(f);
	return f;
};
const settle = async (f: Pick<ComponentFixture<unknown>, 'detectChanges' | 'whenStable'>) => {
	f.detectChanges();
	await f.whenStable();
	f.detectChanges();
	await f.whenStable();
	// Brain's RxJS hover/debounce runs outside Angular; wait for the rendered browser state.
	await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
	f.detectChanges();
};
const key = async (key: string) => userEvent.keyboard(key);
// Observe the component handlers before cancelling only the fixture's browser navigation.
// Synthetic Ctrl clicks still execute an anchor's default navigation in Chromium.
const dispatchWithoutLeavingFixture = (link: HTMLAnchorElement, event: MouseEvent) => {
	let preventedByComponent: boolean | undefined;
	link.addEventListener(
		'click',
		(nativeEvent) => {
			preventedByComponent = nativeEvent.defaultPrevented;
			nativeEvent.preventDefault();
		},
		{ once: true },
	);
	link.dispatchEvent(event);
	return preventedByComponent;
};
it('owns list and chevron anatomy, preserves native link attributes and independent current-page state', async () => {
	const f = await setup();
	const el: HTMLElement = f.nativeElement;
	expect(el.querySelector('[role=navigation]')?.getAttribute('aria-label')).toBe('Site');
	f.componentInstance.label.set('Updated site');
	f.detectChanges();
	expect(el.querySelector('[role=navigation]')?.getAttribute('aria-label')).toBe('Updated site');
	expect(el.querySelector('[role=list]')?.children.length).toBe(3);
	expect(el.querySelectorAll('[role=listitem]').length).toBe(3);
	expect(el.querySelectorAll('[role=menu],[role=menuitem]').length).toBe(0);
	const link = el.querySelector<HTMLAnchorElement>('a')!;
	expect(link.href).toBe('https://example.com/');
	expect(link.target).toBe('_blank');
	expect(link.rel).toBe('noopener');
	expect(link.getAttribute('aria-current')).toBe('page');
	f.componentInstance.current.set(false);
	f.detectChanges();
	link.focus();
	await settle(f);
	expect(link.hasAttribute('aria-current')).toBe(false);
	f.componentInstance.value.set('external');
	await settle(f);
	expect(link.hasAttribute('aria-current')).toBe(false);
	expect(el.querySelector('button')?.querySelectorAll('ng-icon').length).toBe(1);
	expect(el.querySelector('ng-icon')?.getAttribute('aria-hidden')).toBe('true');
	const result = await axe.run(el);
	expect(result.violations).toEqual([]);
});

@Component({
	imports: [CapsNavigationMenuImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-navigation-menu aria-label="Default active state" [(value)]="value" openOn="click" [delayDuration]="0">
			<li capsNavigationMenuItem id="destination">
				<a capsNavigationMenuLink href="/destination">Destination</a>
			</li>
			<li capsNavigationMenuItem id="panel">
				<button caps-navigation-menu-trigger>Panel</button>
				<ng-template capsNavigationMenuContent><a capsNavigationMenuLink href="/child">Child</a></ng-template>
			</li>
		</caps-navigation-menu>
	`,
})
class DefaultActiveHost {
	public readonly value = signal<string | undefined>(undefined);
}
it('preserves omitted active fallback for direct item links and keeps panel destinations unmarked', async () => {
	const f = TestBed.createComponent(DefaultActiveHost);
	f.detectChanges();
	await settle(f);
	const direct: HTMLAnchorElement = f.nativeElement.querySelector('a');
	expect(direct.hasAttribute('aria-current')).toBe(false);
	f.componentInstance.value.set('destination');
	await settle(f);
	expect(direct.getAttribute('aria-current')).toBe('page');
	f.componentInstance.value.set('panel');
	await settle(f);
	expect(direct.hasAttribute('aria-current')).toBe(false);
	const trigger: HTMLButtonElement = f.nativeElement.querySelector('button');
	await expect
		.poll(() => {
			f.detectChanges();
			return document
				.getElementById(trigger.getAttribute('aria-controls')!)
				?.querySelector('a')
				?.hasAttribute('aria-current');
		})
		.toBe(false);
});

it('opens controlled deferred panels, labels them, traverses Tab and closes Escape restoring focus', async () => {
	const f = await setup();
	const trigger: HTMLButtonElement = f.nativeElement.querySelector('button');
	expect(trigger.type).toBe('button');
	expect(trigger.getAttribute('aria-expanded')).toBe('false');
	expect(trigger.hasAttribute('aria-controls')).toBe(false);
	await userEvent.click(trigger);
	await settle(f);
	expect(f.componentInstance.submitted).toBe(false);
	await expect
		.poll(() => {
			f.detectChanges();
			return f.componentInstance.value();
		})
		.toBe('docs');
	const panel = document.getElementById(trigger.getAttribute('aria-controls')!)!;
	expect(panel.classList.contains('caps-navigation-menu-content')).toBe(true);
	expect(panel.classList.contains('test-panel')).toBe(true);
	f.componentInstance.panelClass.set('updated-panel');
	f.detectChanges();
	expect(panel.classList.contains('updated-panel')).toBe(true);
	expect(panel.classList.contains('test-panel')).toBe(false);
	expect(panel.getAttribute('aria-labelledby')).toBe(trigger.id);
	expect(panel.getAttribute('role')).toBe('group');
	const links = panel.querySelectorAll<HTMLAnchorElement>('a');
	trigger.focus();
	await key('{ArrowDown}');
	await settle(f);
	expect(document.activeElement).toBe(links[0]);
	await key('{Tab}');
	await settle(f);
	expect(document.activeElement).toBe(links[1]);
	await key('{Shift>}{Tab}{/Shift}');
	await settle(f);
	expect(document.activeElement).toBe(links[0]);
	await key('{Escape}');
	await settle(f);
	expect(document.activeElement).toBe(trigger);
	expect(trigger.getAttribute('aria-expanded')).toBe('false');
	expect(panel.isConnected).toBe(false);
});
it('skips disabled siblings with arrows, reverses RTL navigation and preserves native modified clicks', async () => {
	const f = await setup();
	const trigger: HTMLButtonElement = f.nativeElement.querySelector('button');
	const link: HTMLAnchorElement = f.nativeElement.querySelector('a');
	trigger.focus();
	await key('{ArrowRight}');
	await settle(f);
	expect(document.activeElement).toBe(link);
	f.componentInstance.direction.set('rtl');
	f.detectChanges();
	trigger.focus();
	await key('{ArrowLeft}');
	await settle(f);
	expect(document.activeElement).toBe(link);
	const event = new MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true });
	expect(dispatchWithoutLeavingFixture(link, event)).toBe(false);
});
it('opens on mouseover only in hover mode, and enters vertical content with the directional key', async () => {
	const f = await setup();
	const trigger: HTMLButtonElement = f.nativeElement.querySelector('button');
	await userEvent.hover(trigger);
	await settle(f);
	expect(trigger.getAttribute('aria-expanded')).toBe('false');
	await userEvent.unhover(trigger);
	await settle(f);
	f.componentInstance.trigger.set('hover');
	f.detectChanges();
	await userEvent.hover(trigger);
	await settle(f);
	expect(trigger.getAttribute('aria-expanded')).toBe('true');
	f.componentInstance.orientation.set('vertical');
	f.detectChanges();
	trigger.focus();
	await key('{ArrowRight}');
	await settle(f);
	expect((document.activeElement as HTMLElement).textContent).toBe('First');
});
it('keeps active page separate from a two-way controlled open value', async () => {
	const f = await setup();
	await userEvent.hover(f.nativeElement.querySelector('button'));
	await settle(f);
	expect(f.componentInstance.value()).toBeUndefined();
	f.componentInstance.value.set('docs');
	await settle(f);
	const trigger: HTMLButtonElement = f.nativeElement.querySelector('button');
	expect(trigger.getAttribute('aria-expanded')).toBe('true');
	const links = document.querySelectorAll('.caps-navigation-menu-content a');
	expect(Array.from(links).every((link) => !link.hasAttribute('aria-current'))).toBe(true);
	f.componentInstance.value.set(undefined);
	await settle(f);
	expect(trigger.getAttribute('aria-expanded')).toBe('false');
});

@Component({
	imports: [CapsNavigationMenuImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-navigation-menu aria-label="Outer" [delayDuration]="0">
			<li capsNavigationMenuItem id="outer">
				<button caps-navigation-menu-trigger>Outer</button>
				<ng-template capsNavigationMenuContent>
					<caps-navigation-menu aria-label="Inner" orientation="vertical" [delayDuration]="0">
						<li capsNavigationMenuItem id="inner">
							<button caps-navigation-menu-trigger>Inner</button>
							<ng-template capsNavigationMenuContent>
								<a capsNavigationMenuLink href="/nested">Nested destination</a>
							</ng-template>
						</li>
					</caps-navigation-menu>
				</ng-template>
			</li>
		</caps-navigation-menu>
	`,
})
class NestedHost {}
it('isolates nested navigation contexts and keeps both panels labelled', async () => {
	const f = TestBed.createComponent(NestedHost);
	f.detectChanges();
	const outer: HTMLButtonElement = f.nativeElement.querySelector('button');
	await userEvent.hover(outer);
	f.detectChanges();
	await f.whenStable();
	f.detectChanges();
	await f.whenStable();
	const panel = document.getElementById(outer.getAttribute('aria-controls')!)!;
	const inner = panel.querySelector<HTMLButtonElement>('button')!;
	await userEvent.hover(inner);
	f.detectChanges();
	await f.whenStable();
	f.detectChanges();
	await f.whenStable();
	const nested = document.getElementById(inner.getAttribute('aria-controls')!)!;
	expect(outer.getAttribute('aria-expanded')).toBe('true');
	expect(inner.getAttribute('aria-expanded')).toBe('true');
	expect(nested.getAttribute('aria-labelledby')).toBe(inner.id);
	expect(panel.getAttribute('aria-labelledby')).toBe(outer.id);
	expect(nested.querySelector('a')?.getAttribute('href')).toBe('/nested');
	inner.focus();
	await userEvent.keyboard('{ArrowRight}');
	expect(document.activeElement?.textContent).toBe('Nested destination');
	await userEvent.keyboard('{Escape}');
	await settle(f);
	expect(document.activeElement).toBe(inner);
	expect(inner.getAttribute('aria-expanded')).toBe('false');
	expect(outer.getAttribute('aria-expanded')).toBe('true');
});

@Component({
	imports: [CapsNavigationMenuImports, RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-navigation-menu aria-label="Account">
			<li capsNavigationMenuItem>
				<a capsNavigationMenuLink routerLink="/account" active>Account</a>
			</li>
		</caps-navigation-menu>
	`,
})
class RouterHost {}
it('composes consumer-owned RouterLink without a Capsule route input', () => {
	TestBed.configureTestingModule({ providers: [provideRouter([])] });
	const f = TestBed.createComponent(RouterHost);
	f.detectChanges();
	const link: HTMLAnchorElement = f.nativeElement.querySelector('a');
	expect(link.getAttribute('href')).toBe('/account');
	expect(link.getAttribute('aria-current')).toBe('page');
	const modified = new MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true });
	expect(dispatchWithoutLeavingFixture(link, modified)).toBe(false);
});

it('updates native disabled state, skips disabled triggers and prevents disabled-anchor navigation', async () => {
	const f = await setup();
	const buttons: NodeListOf<HTMLButtonElement> = f.nativeElement.querySelectorAll('button');
	const link: HTMLAnchorElement = f.nativeElement.querySelector('a');
	expect(buttons[1].disabled).toBe(true);
	expect(buttons[1].tabIndex).toBe(-1);
	f.componentInstance.disabled.set(false);
	f.detectChanges();
	await settle(f);
	expect(buttons[1].disabled).toBe(false);
	buttons[0].focus();
	await key('{ArrowRight}');
	await settle(f);
	expect(document.activeElement).toBe(buttons[1]);
	f.componentInstance.disabled.set(true);
	f.componentInstance.linkDisabled.set(true);
	f.detectChanges();
	await settle(f);
	expect(buttons[1].disabled).toBe(true);
	expect(link.tabIndex).toBe(-1);
	expect(link.getAttribute('aria-disabled')).toBe('true');
	const click = new MouseEvent('click', { bubbles: true, cancelable: true });
	link.dispatchEvent(click);
	expect(click.defaultPrevented).toBe(true);
	buttons[0].focus();
	await key('{ArrowRight}');
	await settle(f);
	expect(document.activeElement).toBe(buttons[0]);
	expect(buttons[1].getAttribute('aria-expanded')).toBe('false');
});

it('renders coherent server ARIA for a controlled item without changing its value', async () => {
	TestBed.configureTestingModule({ providers: [{ provide: PLATFORM_ID, useValue: 'server' }] });
	const f = await setup();
	f.componentInstance.value.set('docs');
	await settle(f);
	const trigger: HTMLButtonElement = f.nativeElement.querySelector('button');
	await expect
		.poll(() => {
			f.detectChanges();
			return f.componentInstance.value();
		})
		.toBe('docs');
	expect(trigger.getAttribute('aria-expanded')).toBe('false');
	expect(trigger.hasAttribute('aria-controls')).toBe(false);
	expect(document.querySelector('.caps-navigation-menu-content')).toBe(null);
});
