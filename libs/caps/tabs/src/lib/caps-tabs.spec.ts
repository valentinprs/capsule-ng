import { Dir } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, createComponent, EnvironmentInjector, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { userEvent } from '@vitest/browser/context';
import axe from 'axe-core';
import { CapsTabs, CapsTabsImports } from '../index';

@Component({
	imports: [CapsTabsImports, Dir],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<section [dir]="direction()">
			<caps-tabs [(value)]="value" [followFocus]="followFocus()" [orientation]="orientation()" id="settings">
				<caps-tabs-list aria-label="Settings">
					<button capsTabsTrigger value="account">Account</button>
					<button capsTabsTrigger value="disabled" disabled>Disabled</button>
					<button capsTabsTrigger value="password">Password</button>
				</caps-tabs-list>
				<caps-tabs-content value="account"><input aria-label="Name" value="Alice" /></caps-tabs-content>
				<caps-tabs-content value="disabled">Disabled panel</caps-tabs-content>
				<caps-tabs-content value="password">
					<ng-template capsTabsContentLazy><input aria-label="Password" /></ng-template>
				</caps-tabs-content>
			</caps-tabs>
		</section>
		<caps-tabs value="account">
			<caps-tabs-list aria-label="Another group">
				<button capsTabsTrigger value="account">Another account</button>
			</caps-tabs-list>
			<caps-tabs-content value="account">Second panel</caps-tabs-content>
		</caps-tabs>
	`,
})
class Host {
	public readonly value = signal<string | undefined>('account');
	public readonly direction = signal<'ltr' | 'rtl'>('ltr');
	public readonly followFocus = signal(true);
	public readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
}
function setup() {
	const fixture = TestBed.createComponent(Host);
	fixture.detectChanges();
	return fixture;
}
it('preserves native buttons, unique associations, two-way selection, disabled tabs and cached content', async () => {
	const f = setup();
	const el: HTMLElement = f.nativeElement;
	const buttons = el.querySelectorAll<HTMLButtonElement>('button');
	expect(buttons[0].type).toBe('button');
	const ids = Array.from(el.querySelectorAll('[id]')).map((n) => n.id);
	expect(new Set(ids).size).toBe(ids.length);
	for (const b of Array.from(buttons)) {
		const panel = el.querySelector<HTMLElement>(`#${b.getAttribute('aria-controls')}`)!;
		expect(panel.getAttribute('aria-labelledby')).toBe(b.id);
	}
	expect(el.querySelector('input[aria-label=Password]')).toBeNull();
	buttons[1].click();
	f.detectChanges();
	expect(f.componentInstance.value()).toBe('account');
	await userEvent.click(buttons[2]);
	f.detectChanges();
	expect(f.componentInstance.value()).toBe('password');
	const password = el.querySelector<HTMLInputElement>('input[aria-label=Password]')!;
	password.value = 'saved';
	await userEvent.click(buttons[0]);
	f.detectChanges();
	expect(password.isConnected).toBe(true);
	expect(password.closest('caps-tabs-content')!.hasAttribute('hidden')).toBe(true);
	await userEvent.click(buttons[2]);
	f.detectChanges();
	expect(el.querySelector('input[aria-label=Password]')).toBe(password);
	expect(password.value).toBe('saved');
	expect((await axe.run(el, { rules: { region: { enabled: false } } })).violations).toEqual([]);
});
it('supports automatic/manual focus, Home/End, skipped disabled tabs, vertical orientation and native Enter/Space', async () => {
	const f = setup();
	const el: HTMLElement = f.nativeElement;
	const buttons = el.querySelectorAll<HTMLButtonElement>('button');
	buttons[0].focus();
	await userEvent.keyboard('{ArrowRight}');
	f.detectChanges();
	expect(document.activeElement).toBe(buttons[2]);
	expect(f.componentInstance.value()).toBe('password');
	await userEvent.keyboard('{Home}');
	f.detectChanges();
	expect(f.componentInstance.value()).toBe('account');
	f.componentInstance.followFocus.set(false);
	f.detectChanges();
	await userEvent.keyboard('{End}');
	f.detectChanges();
	expect(document.activeElement).toBe(buttons[2]);
	expect(f.componentInstance.value()).toBe('account');
	expect(buttons[2].tabIndex).toBe(0);
	expect(buttons[0].tabIndex).toBe(-1);
	await userEvent.keyboard('{Enter}');
	f.detectChanges();
	expect(f.componentInstance.value()).toBe('password');
	await userEvent.keyboard('{Home}');
	f.detectChanges();
	await userEvent.keyboard(' ');
	f.detectChanges();
	expect(f.componentInstance.value()).toBe('account');
	f.componentInstance.orientation.set('vertical');
	f.detectChanges();
	await userEvent.keyboard('{ArrowRight}');
	expect(document.activeElement).toBe(buttons[0]);
	await userEvent.keyboard('{ArrowDown}');
	f.detectChanges();
	expect(document.activeElement).toBe(buttons[2]);
	expect(f.componentInstance.value()).toBe('account');
	await userEvent.keyboard('{ArrowUp}');
	f.detectChanges();
	expect(document.activeElement).toBe(buttons[0]);
	expect(el.querySelector('[role=tablist]')!.getAttribute('aria-orientation')).toBe('vertical');
});

it('normalizes missing, unknown and disabled values to the first enabled tab without an activation event', () => {
	const f = setup();
	for (const value of [undefined, 'missing', 'disabled']) {
		f.componentInstance.value.set(value);
		f.detectChanges();
		expect(f.componentInstance.value()).toBe('account');
		expect(f.nativeElement.querySelector('#settings-tab-account').tabIndex).toBe(0);
	}
});
it('reverses horizontal navigation in RTL', async () => {
	const f = setup();
	f.componentInstance.direction.set('rtl');
	f.detectChanges();
	const el: HTMLElement = f.nativeElement;
	const account = el.querySelector<HTMLButtonElement>('#settings-tab-account')!;
	const password = el.querySelector<HTMLButtonElement>('#settings-tab-password')!;
	account.focus();
	await userEvent.keyboard('{Shift>}{ArrowLeft}{/Shift}');
	f.detectChanges();
	expect(document.activeElement).toBe(account);
	expect(f.componentInstance.value()).toBe('account');
	await userEvent.keyboard('{ArrowLeft}');
	f.detectChanges();
	expect(document.activeElement).toBe(password);
	expect(f.componentInstance.value()).toBe('password');
	await userEvent.keyboard('{ArrowRight}');
	f.detectChanges();
	expect(document.activeElement).toBe(account);
});
@Component({
	imports: [CapsTabsImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-tabs [followFocus]="false">
			<caps-tabs-paginated-list ariaLabel="Many tabs">
				<button capsTabsTrigger value="one">One</button>
				<button capsTabsTrigger value="two">Two</button>
			</caps-tabs-paginated-list>
			<caps-tabs-content value="one">First</caps-tabs-content>
			<caps-tabs-content value="two">Second</caps-tabs-content>
		</caps-tabs>
	`,
})
class PaginatedHost {}
it('paginated lists select a default and preserve manual Enter activation', async () => {
	const f = TestBed.createComponent(PaginatedHost);
	f.detectChanges();
	const buttons: NodeListOf<HTMLButtonElement> = f.nativeElement.querySelectorAll('[role=tab]');
	expect(buttons[0].getAttribute('aria-selected')).toBe('true');
	buttons[0].focus();
	await userEvent.keyboard('{ArrowRight}');
	f.detectChanges();
	expect(document.activeElement).toBe(buttons[1]);
	expect(buttons[0].getAttribute('aria-selected')).toBe('true');
	await userEvent.keyboard('{Enter}');
	f.detectChanges();
	expect(buttons[1].getAttribute('aria-selected')).toBe('true');
});

it('reuses an SSR host id before allocating a client id', () => {
	const host = document.createElement('caps-tabs');
	host.id = 'server-rendered-tabs';
	const ref = createComponent(CapsTabs, {
		hostElement: host,
		environmentInjector: TestBed.inject(EnvironmentInjector),
	});
	ref.changeDetectorRef.detectChanges();
	expect(ref.instance.id()).toBe('server-rendered-tabs');
	expect(host.id).toBe('server-rendered-tabs');
	ref.destroy();
});
@Component({
	imports: [CapsTabsImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-tabs value="outer" id="outer">
			<caps-tabs-list aria-label="Outer">
				<button capsTabsTrigger value="outer">Outer</button>
				<button capsTabsTrigger value="other">Other</button>
			</caps-tabs-list>
			<caps-tabs-content value="outer">
				<caps-tabs value="one" id="inner">
					<caps-tabs-list aria-label="Inner">
						<button capsTabsTrigger value="one">One</button>
						<button capsTabsTrigger value="two">Two</button>
					</caps-tabs-list>
					<caps-tabs-content value="one">One panel</caps-tabs-content>
					<caps-tabs-content value="two">Two panel</caps-tabs-content>
				</caps-tabs>
			</caps-tabs-content>
			<caps-tabs-content value="other">Other panel</caps-tabs-content>
		</caps-tabs>
	`,
})
class NestedHost {}
it('isolates nested lists and selections', async () => {
	const f = TestBed.createComponent(NestedHost);
	f.detectChanges();
	const el: HTMLElement = f.nativeElement;
	el.querySelector<HTMLButtonElement>('#inner-tab-one')!.focus();
	await userEvent.keyboard('{ArrowRight}');
	f.detectChanges();
	expect(el.querySelector('#inner-tab-two')!.getAttribute('aria-selected')).toBe('true');
	expect(el.querySelector('#outer-tab-outer')!.getAttribute('aria-selected')).toBe('true');
});

@Component({
	imports: [CapsTabsImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-tabs value="second">
			<caps-tabs-list aria-label="Initial value">
				<button capsTabsTrigger value="first">First</button>
				<button capsTabsTrigger value="second">Second</button>
			</caps-tabs-list>
			<caps-tabs-content value="first">First panel</caps-tabs-content>
			<caps-tabs-content value="second">Second panel</caps-tabs-content>
		</caps-tabs>
	`,
})
class InitialSecondHost {}
it('preserves an explicit initial value even when its trigger is registered after the first', () => {
	const f = TestBed.createComponent(InitialSecondHost);
	f.detectChanges();
	expect(f.nativeElement.querySelectorAll('[role=tab]')[1].getAttribute('aria-selected')).toBe('true');
});
