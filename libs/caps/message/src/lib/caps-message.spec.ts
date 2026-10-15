import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { CapsMessageImports } from '../index';
@Component({
	selector: 'caps-message-test',
	imports: [CapsMessageImports, CapsBubbleImports, CapsAvatarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-message-group>
			<caps-message [align]="align()" aria-label="Alice's message">
				<caps-message-avatar>
					<caps-avatar><caps-avatar-fallback aria-label="Alice">AM</caps-avatar-fallback></caps-avatar>
				</caps-message-avatar>
				<caps-message-content>
					<caps-message-header>
						<strong>Alice Martin</strong>
						<time datetime="2026-10-07T14:30:00+02:00">14:30</time>
					</caps-message-header>
					<caps-bubble variant="muted">
						<caps-bubble-content>Please review the proposal.</caps-bubble-content>
					</caps-bubble>
					<caps-message-footer>
						Edited at 14:32
						<button type="button" (click)="actions = actions + 1">Retry</button>
					</caps-message-footer>
				</caps-message-content>
			</caps-message>
		</caps-message-group>
	`,
})
class Host {
	public readonly align = signal<'start' | 'end'>('start');
	public actions = 0;
}
describe('CapsMessage public composition', () => {
	it('projects author, native time, avatar, status and independent actions in an article', async () => {
		const view = await render(Host);
		expect(screen.getByRole('article', { name: "Alice's message" })).toBeVisible();
		expect(view.container.querySelector('time')).toHaveAttribute('datetime', '2026-10-07T14:30:00+02:00');
		expect(screen.getByText('Edited at 14:32')).toBeVisible();
		screen.getByRole('button', { name: 'Retry' }).click();
		expect(view.fixture.componentInstance.actions).toBe(1);
		expect(view.container.querySelector('[aria-live], [role=status], [role=alert]')).toBeNull();
		expect((await axe.run(view.container)).violations).toEqual([]);
	});
	it('updates logical alignment and preserves content without the legacy HTML align attribute', async () => {
		const view = await render(Host);
		const row = screen.getByRole('article');
		expect(row).toHaveAttribute('data-align', 'start');
		view.fixture.componentInstance.align.set('end');
		view.detectChanges();
		expect(row).toHaveAttribute('data-align', 'end');
		expect(row).not.toHaveAttribute('align');
		expect(screen.getByText('Please review the proposal.')).toBeVisible();
	});
});
