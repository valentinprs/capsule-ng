import { Dir } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { page, userEvent } from '@vitest/browser/context';
import axe from 'axe-core';
import { partitionKnownSonnerViolations } from '../../testing/known-axe-violations';
import { CapsSonnerImports, toast } from '../index';

@Component({
	imports: [CapsSonnerImports, Dir],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<main>
			<h1 class="sr-only">Sonner test</h1>
			<button type="button" id="origin">Application action</button>
			<div [dir]="direction()"><caps-toaster [expand]="true" [closeButton]="true" /></div>
		</main>
	`,
})
class Host {
	public readonly direction = signal<'ltr' | 'rtl'>('ltr');
}

function setup() {
	const fixture = TestBed.createComponent(Host);
	fixture.detectChanges();
	return fixture;
}
async function render(fixture: ReturnType<typeof setup>) {
	fixture.detectChanges();
	await fixture.whenStable();
	fixture.detectChanges();
}
async function readyToInteract(fixture: ReturnType<typeof setup>) {
	await expect
		.poll(() => fixture.nativeElement.querySelector('[data-sonner-toast]')?.getAttribute('data-mounted'))
		.toBe('true');
	await expect
		.poll(() => {
			const toastElement: HTMLElement | null = fixture.nativeElement.querySelector('[data-sonner-toast]');
			return toastElement?.getAnimations({ subtree: true }).every((animation) => animation.playState !== 'running');
		})
		.toBe(true);
}
beforeEach(async () => {
	// Keep the test iframe inside Playwright’s 720px parent viewport for real pointer input.
	await page.viewport(414, 650);
});
afterEach(() => {
	toast.dismiss();
	TestBed.resetTestingModule();
});

it('renders Spartan plain-text descriptions, four statuses and per-toast close options', async () => {
	const f = setup();
	for (const type of ['info', 'success', 'warning', 'error'] as const) {
		toast[type](`${type} <b>plain</b>`, {
			description: 'Details',
			duration: Number.POSITIVE_INFINITY,
			closeButton: type === 'error',
		});
	}
	await render(f);
	const items = f.nativeElement.querySelectorAll('[data-sonner-toast]');
	expect(items).toHaveLength(4);
	for (const item of items) {
		expect(item.getAttribute('role')).toBe('status');
		expect(item.getAttribute('aria-live')).toBe('polite');
		expect(item.getAttribute('aria-atomic')).toBe('true');
		expect(item.querySelector('b')).toBeNull();
		expect(item.textContent).toContain('<b>plain</b>');
		expect(item.textContent).toContain('Details');
		expect(!!item.querySelector('[data-close-button]')).toBe(item.dataset.type === 'error');
	}
	expect(f.nativeElement.querySelector('[data-close-button]').getAttribute('aria-label')).toBe('Close toast');
});

it('retains native action and cancel keyboard activation and dismissal', async () => {
	const f = setup();
	const primary = vi.fn();
	const secondary = vi.fn();
	const notify = () =>
		toast('Document archived', {
			duration: Number.POSITIVE_INFINITY,
			action: { label: 'Undo', onClick: primary },
			cancel: { label: 'Keep', onClick: secondary },
		});
	notify();
	await render(f);
	const action: HTMLButtonElement = f.nativeElement.querySelector('[data-caps-toast-action]');
	expect(action.type).toBe('button');
	expect(action.textContent?.trim()).toBe('Undo');
	action.focus();
	expect(document.activeElement).toBe(action);
	await userEvent.keyboard('{Enter}');
	await render(f);
	expect(primary).toHaveBeenCalledOnce();
	expect(primary.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
	await expect.poll(() => f.nativeElement.querySelectorAll('[data-sonner-toast]').length).toBe(0);
	notify();
	await render(f);
	const cancel: HTMLButtonElement = f.nativeElement.querySelector('[data-caps-toast-cancel]');
	cancel.focus();
	await userEvent.keyboard(' ');
	await render(f);
	expect(secondary).toHaveBeenCalledOnce();
	await expect.poll(() => f.nativeElement.querySelectorAll('[data-sonner-toast]').length).toBe(0);
});

it('updates a loading notification by ID, preserves importance, and resolves public promises', async () => {
	const f = setup();
	const id = toast.loading('Saving', { duration: Number.POSITIVE_INFINITY, important: true });
	await render(f);
	expect(f.nativeElement.querySelector('[data-sonner-toast]').getAttribute('aria-live')).toBe('assertive');
	toast.success('Saved', { id, duration: Number.POSITIVE_INFINITY });
	await render(f);
	expect(f.nativeElement.querySelectorAll('[data-sonner-toast]')).toHaveLength(1);
	expect(f.nativeElement.querySelector('[data-sonner-toast]').dataset.type).toBe('success');
	expect(f.nativeElement.textContent).toContain('Saved');
	toast.dismiss(id);
	await render(f);
	let resolve!: (value: string) => void;
	toast.promise(
		new Promise<string>((r) => {
			resolve = r;
		}),
		{ loading: 'Waiting', success: (value) => `Loaded ${value}`, error: 'Failed' },
	);
	await render(f);
	expect(f.nativeElement.textContent).toContain('Waiting');
	resolve('document');
	await render(f);
	await expect.poll(() => f.nativeElement.textContent).toContain('Loaded document');
	expect(f.nativeElement.querySelectorAll('[data-sonner-toast]')).toHaveLength(1);
});

it('keeps explicitly infinite duration content and dismisses only the requested ID', async () => {
	const f = setup();
	const persistent = toast('Persistent', { duration: Number.POSITIVE_INFINITY });
	const other = toast('Other notification', { duration: Number.POSITIVE_INFINITY });
	await render(f);
	await new Promise((resolve) => setTimeout(resolve, 4300));
	expect(f.nativeElement.textContent).toContain('Persistent');
	toast.dismiss(persistent);
	await render(f);
	expect(f.nativeElement.textContent).not.toContain('Persistent');
	expect(f.nativeElement.textContent).toContain('Other notification');
	toast.dismiss(other);
	await render(f);
	expect(f.nativeElement.querySelector('[data-sonner-toast]')).toBeNull();
});

it('retains finite timers, literal zero duration and the native close button', async () => {
	const f = setup();
	toast('Short lived', { duration: 80 });
	await render(f);
	await expect.poll(() => f.nativeElement.querySelectorAll('[data-sonner-toast]').length).toBe(0);
	const onAutoClose = vi.fn();
	toast('Zero duration', { duration: 0, onAutoClose });
	await render(f);
	await expect.poll(() => onAutoClose.mock.calls.length).toBe(1);
	await expect.poll(() => f.nativeElement.querySelectorAll('[data-sonner-toast]').length).toBe(0);
	toast('Closable', { duration: Number.POSITIVE_INFINITY, closeButton: true });
	await render(f);
	await readyToInteract(f);
	await userEvent.click(f.nativeElement.querySelector('[data-close-button]'));
	await expect.poll(() => f.nativeElement.querySelectorAll('[data-sonner-toast]').length).toBe(0);
});

it('preserves RTL positioning and Alt+T focus on the notification region', async () => {
	const f = setup();
	f.componentInstance.direction.set('rtl');
	toast('RTL notification', {
		duration: Number.POSITIVE_INFINITY,
		action: { label: 'Open', onClick: () => undefined },
	});
	await render(f);
	const list: HTMLOListElement = f.nativeElement.querySelector('[data-sonner-toaster]');
	expect(list.getAttribute('dir')).toBe('rtl');
	f.nativeElement.querySelector('#origin').focus();
	await userEvent.keyboard('{Alt>}t{/Alt}');
	expect(document.activeElement).toBe(list);
	expect(f.nativeElement.querySelector('section').getAttribute('aria-label')).toContain('Notifications');
});

it('keeps the server-platform host empty before any browser event invokes toast', async () => {
	TestBed.configureTestingModule({ providers: [{ provide: PLATFORM_ID, useValue: 'server' }] });
	const f = setup();
	await render(f);
	expect(f.nativeElement.querySelector('caps-toaster')).not.toBeNull();
	expect(f.nativeElement.querySelector('[data-sonner-toaster]')).toBeNull();
	expect(f.nativeElement.querySelector('[data-sonner-toast]')).toBeNull();
});

it('reports both known native limitations and no other axe violations for a visible action', async () => {
	const f = setup();
	toast('Document saved', {
		description: 'Changes applied',
		duration: Number.POSITIVE_INFINITY,
		action: { label: 'Undo', onClick: () => undefined },
	});
	await render(f);
	await readyToInteract(f);
	const raw = await axe.run(f.nativeElement);
	const classified = partitionKnownSonnerViolations(raw.violations, f.nativeElement);
	expect(classified.acceptedKnown.map((result) => result.id).sort()).toEqual(['aria-allowed-role', 'list']);
	expect(classified.missingExpected).toEqual([]);
	expect(classified.remaining).toEqual([]);
});

@Component({
	selector: 'caps-test-notice',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<p>Custom component content</p>',
})
class CustomNotice {}
it('keeps public custom components and rejected promises available', async () => {
	const f = setup();
	const id = toast.custom(CustomNotice, { duration: Number.POSITIVE_INFINITY });
	await render(f);
	expect(f.nativeElement.querySelector('caps-test-notice').textContent).toContain('Custom component content');
	toast.dismiss(id);
	await render(f);
	let reject!: (reason: Error) => void;
	toast.promise(
		new Promise<string>((_, r) => {
			reject = r;
		}),
		{ loading: 'Waiting', success: 'Saved', error: 'Network failure' },
	);
	await render(f);
	reject(new Error('offline'));
	await render(f);
	await expect.poll(() => f.nativeElement.textContent).toContain('Network failure');
	expect(f.nativeElement.querySelectorAll('[data-sonner-toast]')).toHaveLength(1);
});

it('keeps cancellable actions open when their handler prevents dismissal', async () => {
	const f = setup();
	toast('Review document', {
		duration: Number.POSITIVE_INFINITY,
		action: { label: 'Review', onClick: (event) => event.preventDefault() },
	});
	await render(f);
	await readyToInteract(f);
	await userEvent.click(f.nativeElement.querySelector('[data-caps-toast-action]'));
	await render(f);
	expect(f.nativeElement.querySelectorAll('[data-sonner-toast]')).toHaveLength(1);
});
