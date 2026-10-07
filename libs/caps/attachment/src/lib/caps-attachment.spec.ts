import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom/vitest';
import { userEvent } from '@vitest/browser/context';
import axe from 'axe-core';
import { CapsAttachmentImports, type CapsAttachmentState } from '../index';
@Component({
	selector: 'caps-attachment-test',
	imports: [CapsAttachmentImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form (submit)="$event.preventDefault(); submitted = submitted + 1">
			<caps-attachment-group>
				<caps-attachment [state]="state()" [size]="size()" [orientation]="orientation()">
					<caps-attachment-media variant="image">
						<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" alt="Cover page" />
					</caps-attachment-media>
					<caps-attachment-content>
						<caps-attachment-title>proposal.pdf</caps-attachment-title>
						<caps-attachment-description>PDF · 240 KB</caps-attachment-description>
					</caps-attachment-content>
					<a
						capsAttachmentTrigger
						href="#proposal"
						target="_blank"
						rel="noreferrer"
						download="proposal.pdf"
						aria-label="Download proposal.pdf"
					></a>
					<caps-attachment-actions>
						<button
							capsAttachmentAction
							[disabled]="disabled()"
							(click)="removed = removed + 1"
							aria-label="Remove proposal.pdf"
						>
							Remove
						</button>
					</caps-attachment-actions>
				</caps-attachment>
			</caps-attachment-group>
			<caps-attachment-group tabindex="-1" aria-label="Optional attachments"></caps-attachment-group>
			<caps-attachment>
				<caps-attachment-content><caps-attachment-title>notes.txt</caps-attachment-title></caps-attachment-content>
				<button capsAttachmentTrigger (click)="opened = opened + 1" aria-label="Preview notes.txt"></button>
			</caps-attachment>
		</form>
	`,
})
class Host {
	public readonly state = signal<CapsAttachmentState>('done');
	public readonly size = signal<'default' | 'sm' | 'xs'>('default');
	public readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
	public readonly disabled = signal(false);
	public removed = 0;
	public opened = 0;
	public submitted = 0;
}
describe('CapsAttachment public composition', () => {
	it('preserves five states and exposes busy only for ongoing upload/processing, without live announcements', async () => {
		const view = await render(Host);
		const card = view.container.querySelector('caps-attachment')!;
		for (const state of ['idle', 'uploading', 'processing', 'error', 'done'] as const) {
			view.fixture.componentInstance.state.set(state);
			view.detectChanges();
			expect(card).toHaveAttribute('data-state', state);
			expect(card.getAttribute('aria-busy')).toBe(state === 'uploading' || state === 'processing' ? 'true' : null);
		}
		expect(view.container.querySelector('[aria-live], [role=alert], [role=status]')).toBeNull();
	});
	it('preserves sizes, orientations, image alternatives and metadata projection', async () => {
		const view = await render(Host);
		const card = view.container.querySelector('caps-attachment')!;
		for (const size of ['default', 'sm', 'xs'] as const) {
			view.fixture.componentInstance.size.set(size);
			view.detectChanges();
			expect(card).toHaveAttribute('data-size', size);
		}
		for (const orientation of ['horizontal', 'vertical'] as const) {
			view.fixture.componentInstance.orientation.set(orientation);
			view.detectChanges();
			expect(card).toHaveAttribute('data-orientation', orientation);
		}
		expect(screen.getByRole('img', { name: 'Cover page' })).toBeVisible();
		expect(screen.getByText('PDF · 240 KB')).toBeVisible();
		expect(view.container.querySelector('caps-attachment-group')).toHaveAttribute('tabindex', '0');
		expect(screen.getByRole('group', { name: 'Optional attachments' })).toHaveAttribute('tabindex', '-1');
	});
	it('retains native link behavior and separate removal action, accessible names and no nested controls', async () => {
		const view = await render(Host);
		const link = screen.getByRole('link', { name: 'Download proposal.pdf' });
		expect(link).toHaveAttribute('href', '#proposal');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noreferrer');
		expect(link).toHaveAttribute('download', 'proposal.pdf');
		expect(link).not.toHaveAttribute('type');
		expect(view.container.querySelector('button button, button a, a button, a a')).toBeNull();
		const user = userEvent.setup();
		link.focus();
		await user.tab();
		const remove = screen.getByRole('button', { name: 'Remove proposal.pdf' });
		expect(remove).toHaveFocus();
		await user.keyboard('[Enter]');
		view.detectChanges();
		expect(view.fixture.componentInstance.removed).toBe(1);
		expect(view.fixture.componentInstance.opened).toBe(0);
		expect(view.fixture.componentInstance.submitted).toBe(0);
		expect((await axe.run(view.container)).violations).toEqual([]);
	});
	it('uses native button activation once with Enter/Space and never submits the surrounding form', async () => {
		const view = await render(Host);
		const user = userEvent.setup();
		const trigger = screen.getByRole('button', { name: 'Preview notes.txt' });
		expect(trigger).toHaveAttribute('type', 'button');
		trigger.focus();
		await user.keyboard('[Enter]');
		await user.keyboard('[Space]');
		view.detectChanges();
		expect(view.fixture.componentInstance.opened).toBe(2);
		expect(view.fixture.componentInstance.submitted).toBe(0);
	});
	it('disables the independent action without disabling the native file link', async () => {
		const view = await render(Host);
		view.fixture.componentInstance.disabled.set(true);
		view.detectChanges();
		const remove = screen.getByRole('button', { name: 'Remove proposal.pdf' });
		expect(remove).toBeDisabled();
		remove.click();
		expect(view.fixture.componentInstance.removed).toBe(0);
		expect(screen.getByRole('link', { name: 'Download proposal.pdf' })).not.toHaveAttribute('aria-disabled');
	});
});
