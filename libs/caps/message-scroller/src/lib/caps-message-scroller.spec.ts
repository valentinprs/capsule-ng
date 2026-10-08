import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { render, screen, waitFor } from '@testing-library/angular';
import '@testing-library/jest-dom/vitest';
import { userEvent } from '@vitest/browser/context';
import { CapsMessageScroller, CapsMessageScrollerImports } from '../index';

// Real fixture CSS must be installed in the browser test iframe. Analog's stylesheet
// module injection does not apply a spec component's global styles to that document.
let fixtureStyle: HTMLStyleElement;
beforeAll(() => {
	fixtureStyle = document.createElement('style');
	fixtureStyle.textContent = `
			.scroller-fixture {
				height: 240px;
				width: 360px;
				display: flex;
				flex-direction: column;
				position: relative;
				overflow: hidden;
			}
			.scroller-fixture > [data-slot='message-scroller-viewport'] {
				height: 100%;
				overflow-y: auto;
				flex: 1;
				min-height: 0;
			}
			.scroller-fixture [data-slot='message-scroller-content'] {
				display: flex;
				flex-direction: column;
				min-height: 100%;
			}
			.scroller-fixture [data-slot='message-scroller-item'] {
				min-height: 84px;
				flex-shrink: 0;
				content-visibility: visible;
			}
			.scroller-fixture button[caps-message-scroller-button] {
				position: absolute;
				bottom: 4px;
				right: 4px;
			}
		`;
	document.head.appendChild(fixtureStyle);
});
afterAll(() => fixtureStyle.remove());

@Component({
	selector: 'caps-scroller-test',
	imports: [CapsMessageScrollerImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<h2 id="conversation-name">Project conversation</h2>
		<p id="conversation-help">Use Page Up to read history.</p>
		<caps-message-scroller
			class="scroller-fixture"
			aria-labelledby="conversation-name"
			aria-describedby="conversation-help"
			[autoScroll]="true"
			defaultScrollPosition="end"
			[preserveScrollOnPrepend]="preserve()"
			[announcement]="announcement()"
			[aria-busy]="busy()"
		>
			@for (row of rows(); track row.id) {
				<caps-message-scroller-item [messageId]="row.id" [scrollAnchor]="row.anchor" [id]="'dom-' + row.id">
					<p>{{ row.text }}</p>
					<button type="button">Action {{ row.id }}</button>
					<input [attr.aria-label]="'Reply ' + row.id" />
				</caps-message-scroller-item>
			}
			<button caps-message-scroller-button aria-label="Latest" behavior="auto" [disabled]="disabled()"></button>
		</caps-message-scroller>
	`,
})
class Host {
	public readonly scroller = viewChild.required(CapsMessageScroller);
	public readonly rows = signal(
		Array.from({ length: 12 }, (_, n) => ({ id: 'm' + n, text: 'Message ' + n, anchor: n === 0 })),
	);
	public readonly preserve = signal(true);
	public readonly announcement = signal('');
	public readonly busy = signal(false);
	public readonly disabled = signal(false);
	append(anchor = false): void {
		this.rows.update((rows) => [...rows, { id: 'm' + rows.length, text: 'New message', anchor }]);
	}
}
const settle = async () => {
	await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
};
function viewport(container: HTMLElement): HTMLElement {
	return container.querySelector<HTMLElement>('[data-slot="message-scroller-viewport"]')!;
}

describe('CapsMessageScroller public consumer contract', () => {
	it('owns one named native viewport and log, keeps projected actions outside the log and creates one post-render spacer', async () => {
		const view = await render(Host);
		await settle();
		const region = screen.getByRole('region', { name: 'Project conversation' });
		expect(region.clientHeight).toBeGreaterThan(0);
		expect(region.clientHeight).toBeLessThanOrEqual(240);
		expect(region.scrollHeight).toBeGreaterThan(region.clientHeight);
		expect(region).toHaveAttribute('tabindex', '0');
		expect(region).toHaveAttribute('aria-describedby', 'conversation-help');
		expect(screen.getByRole('log')).toHaveAttribute('aria-live', 'off');
		expect(screen.getByRole('log')).toHaveAttribute('aria-relevant', 'additions');
		expect(screen.getByRole('log').contains(screen.getByRole('button', { name: 'Latest', hidden: true }))).toBe(false);
		expect(view.container.querySelectorAll('[data-message-scroller-spacer]')).toHaveLength(1);
		expect(view.container.querySelector('caps-message-scroller')).not.toHaveAttribute('tabindex');
	});
	it('follows append and progressive growth at the live edge and keeps the jump action inactive', async () => {
		const view = await render(Host);
		await settle();
		view.fixture.componentInstance.append();
		view.detectChanges();
		await settle();
		const region = viewport(view.container);
		await waitFor(() => expect(region.scrollHeight - region.clientHeight - region.scrollTop).toBeLessThan(2));
		view.fixture.componentInstance.rows.update((rows) =>
			rows.map((row, n) => (n === rows.length - 1 ? { ...row, text: row.text.repeat(20) } : row)),
		);
		view.detectChanges();
		await settle();
		await waitFor(() => expect(region.scrollHeight - region.clientHeight - region.scrollTop).toBeLessThan(2));
		expect(screen.getByRole('button', { name: 'Latest', hidden: true })).toHaveAttribute('inert');
	});
	it('protects an old reading position from both ordinary and newly anchored appends', async () => {
		const view = await render(Host);
		await settle();
		const region = viewport(view.container);
		region.focus();
		await userEvent.keyboard('[Home]');
		await waitFor(() => expect(region.scrollTop).toBeLessThan(2));
		await settle();
		const first = view.container.querySelector<HTMLElement>('[data-message-id="m0"]')!;
		const top = first.getBoundingClientRect().top;
		view.fixture.componentInstance.append(false);
		view.detectChanges();
		await settle();
		view.fixture.componentInstance.append(true);
		view.detectChanges();
		await settle();
		view.fixture.componentInstance.rows.update((rows) =>
			rows.map((row, n) => (n === rows.length - 1 ? { ...row, text: row.text.repeat(20) } : row)),
		);
		view.detectChanges();
		await settle();
		expect(Math.abs(first.getBoundingClientRect().top - top)).toBeLessThan(2);
		expect(region).toHaveFocus();
		expect(region.scrollTop).toBeLessThan(2);
	});
	it('allows explicit navigation to a suppressed anchor and admits a later new anchor after returning to latest', async () => {
		const view = await render(Host);
		await settle();
		const host = view.fixture.componentInstance;
		const region = viewport(view.container);
		region.focus();
		await userEvent.keyboard('[Home]');
		await waitFor(() => expect(region.scrollTop).toBeLessThan(2));
		await settle();
		host.append(true);
		view.detectChanges();
		await settle();
		const suppressed = view.container.querySelector<HTMLElement>('[data-message-id="m12"]')!;
		expect(suppressed).toHaveAttribute('data-scroll-anchor', 'true');
		expect(region.scrollTop).toBeLessThan(2);
		expect(host.scroller().scrollToMessage('m12', { align: 'start', behavior: 'auto' })).toBe(true);
		await settle();
		expect(suppressed.getBoundingClientRect().top).toBeLessThan(region.getBoundingClientRect().bottom);
		expect(host.scroller().scrollToEnd({ behavior: 'auto' })).toBe(true);
		await settle();
		host.append(true);
		view.detectChanges();
		await settle();
		const next = view.container.querySelector<HTMLElement>('[data-message-id="m13"]')!;
		await waitFor(() => expect(next.getBoundingClientRect().top - region.getBoundingClientRect().top).toBeLessThan(66));
		expect(next.getBoundingClientRect().top - region.getBoundingClientRect().top).toBeGreaterThanOrEqual(-1);
	});
	it('keeps descendant editing keys native without releasing live-edge follow', async () => {
		const view = await render(Host);
		await settle();
		const host = view.fixture.componentInstance;
		const initialRegion = viewport(view.container);
		await waitFor(() =>
			expect(initialRegion.scrollHeight - initialRegion.clientHeight - initialRegion.scrollTop).toBeLessThan(2),
		);
		const editor = screen.getByRole('textbox', { name: 'Reply m11' });
		editor.focus();
		// Space is both a native editing key and a Brain scroll-intent key. On macOS,
		// Home itself natively scrolls a single-line input's ancestor viewport.
		await userEvent.keyboard('draft [ArrowLeft]');
		expect(editor).toHaveValue('draft ');
		expect((editor as HTMLInputElement).selectionStart).toBe(5);
		expect(editor).toHaveFocus();
		host.append();
		view.detectChanges();
		await settle();
		const region = viewport(view.container);
		await waitFor(() => expect(region.scrollHeight - region.clientHeight - region.scrollTop).toBeLessThan(2));
	});
	it('preserves the visible row on prepend and its independent logical/DOM identity', async () => {
		const view = await render(Host);
		await settle();
		const host = view.fixture.componentInstance;
		host.scroller().scrollToMessage('m5', { align: 'start', behavior: 'auto' });
		await settle();
		const row = view.container.querySelector<HTMLElement>('[data-message-id="m5"]')!;
		const top = row.getBoundingClientRect().top;
		host.rows.update((rows) => [{ id: 'earlier', text: 'Historical message', anchor: true }, ...rows]);
		view.detectChanges();
		await settle();
		expect(Math.abs(row.getBoundingClientRect().top - top)).toBeLessThan(2);
		expect(row).toHaveAttribute('id', 'dom-m5');
		expect(host.scroller().scrollToMessage('unknown')).toBe(false);
	});
	it('returns to latest by native Enter, re-engages follow and keeps focus on the viewport', async () => {
		const view = await render(Host);
		await settle();
		const host = view.fixture.componentInstance;
		host.scroller().scrollToStart();
		await settle();
		view.detectChanges();
		const button = screen.getByRole('button', { name: 'Latest' });
		button.focus();
		await userEvent.keyboard('[Enter]');
		await settle();
		view.detectChanges();
		expect(viewport(view.container)).toHaveFocus();
		expect(button).toHaveAttribute('inert');
		expect(button).toHaveAttribute('tabindex', '-1');
		host.append();
		view.detectChanges();
		await settle();
		const region = viewport(view.container);
		await waitFor(() => expect(region.scrollHeight - region.clientHeight - region.scrollTop).toBeLessThan(2));
	});
	it('honors disabled and canceled native jump activation', async () => {
		const view = await render(Host);
		await settle();
		const host = view.fixture.componentInstance;
		host.scroller().scrollToStart();
		await settle();
		host.disabled.set(true);
		view.detectChanges();
		const button = screen.getByRole('button', { name: 'Latest' });
		expect(button).toBeDisabled();
		button.click();
		expect(viewport(view.container).scrollTop).toBeLessThan(2);
		host.disabled.set(false);
		view.detectChanges();
		button.addEventListener('click', (event) => event.preventDefault(), { capture: true, once: true });
		await userEvent.click(button);
		await settle();
		expect(viewport(view.container).scrollTop).toBeLessThan(2);
	});
	it('keeps history/tokens out of its announcement while exposing an explicit completion and busy state', async () => {
		const view = await render(Host);
		await settle();
		const host = view.fixture.componentInstance;
		const status = view.container.querySelector('[data-slot="message-scroller-announcement"]')!;
		host.busy.set(true);
		host.append();
		view.detectChanges();
		await settle();
		expect(status.textContent?.trim()).toBe('');
		expect(screen.getByRole('log')).toHaveAttribute('aria-busy', 'true');
		host.busy.set(false);
		host.announcement.set('Assistant reply complete');
		view.detectChanges();
		expect(status).toHaveTextContent('Assistant reply complete');
		expect(status).toHaveAttribute('aria-atomic', 'true');
		expect(screen.getByRole('log')).not.toHaveAttribute('aria-busy');
	});
	it('tracks visibility and resets it through the public observer commands', async () => {
		const view = await render(Host);
		await settle();
		const scroller = view.fixture.componentInstance.scroller();
		scroller.observeVisibility();
		await settle();
		await waitFor(() => expect(scroller.visibility().visibleMessageIds.length).toBeGreaterThan(0));
		scroller.unobserveVisibility();
		expect(scroller.visibility()).toEqual({ currentAnchorId: null, visibleMessageIds: [] });
	});
});

@Component({
	selector: 'caps-scroller-scopes-test',
	imports: [CapsMessageScrollerImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-message-scroller #outer aria-label="Outer" style="height:180px" defaultScrollPosition="start">
			<caps-message-scroller-item messageId="same">
				<p>Outer row</p>
				<caps-message-scroller #inner aria-label="Inner" style="height:100px" defaultScrollPosition="start">
					<caps-message-scroller-item messageId="same">Inner row</caps-message-scroller-item>
				</caps-message-scroller>
			</caps-message-scroller-item>
		</caps-message-scroller>
	`,
})
class ScopeHost {
	public readonly outer = viewChild.required<CapsMessageScroller>('outer');
	public readonly inner = viewChild.required<CapsMessageScroller>('inner');
}
describe('CapsMessageScroller isolated scopes', () => {
	it('registers equal message IDs in nested controllers without sharing observers or state', async () => {
		const view = await render(ScopeHost);
		await settle();
		const host = view.fixture.componentInstance;
		expect(host.outer().scrollToMessage('same')).toBe(true);
		expect(host.inner().scrollToMessage('same')).toBe(true);
		host.inner().observeVisibility();
		await settle();
		expect(host.outer().visibility().visibleMessageIds).toEqual([]);
		expect(view.container.querySelectorAll('[id]')).toHaveLength(0);
		expect(view.container.querySelectorAll('[data-message-scroller-spacer]')).toHaveLength(2);
	});
});
