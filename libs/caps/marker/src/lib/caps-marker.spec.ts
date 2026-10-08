import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsLinkImports } from '@capsule-ng/caps/link';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';
import { render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom/vitest';
import { userEvent } from '@vitest/browser/context';
import { CapsMarkerImports, type CapsMarkerVariant } from '../index';
@Component({
	selector: 'caps-marker-test',
	imports: [CapsMarkerImports, CapsLinkImports, CapsSpinnerImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-marker [variant]="variant()" class="consumer-marker">
			<caps-marker-content>Today</caps-marker-content>
		</caps-marker>
		<caps-marker role="status">
			<caps-marker-icon><caps-spinner aria-hidden="true" /></caps-marker-icon>
			<caps-marker-content>Preparing reply</caps-marker-content>
		</caps-marker>
		<a capsMarker href="#run" download="run.txt"><caps-marker-content>Full run</caps-marker-content></a>
		<form (submit)="submissions = submissions + 1; $event.preventDefault()">
			<button capsMarker type="button" [disabled]="disabled()" (click)="actions = actions + 1">
				<caps-marker-content>Revert change</caps-marker-content>
			</button>
		</form>
		<caps-marker>
			<caps-marker-content><a capsLink href="#details">Details</a></caps-marker-content>
		</caps-marker>
	`,
})
class Host {
	public readonly variant = signal<CapsMarkerVariant>('default');
	public readonly disabled = signal(false);
	public actions = 0;
	public submissions = 0;
}
describe('CapsMarker public consumer contract', () => {
	it('preserves all variants and readable separator text without implicit live/interactive roles', async () => {
		const view = await render(Host);
		const marker = view.container.querySelector('caps-marker')!;
		for (const variant of ['default', 'separator', 'border'] as const) {
			view.fixture.componentInstance.variant.set(variant);
			view.detectChanges();
			expect(marker).toHaveAttribute('data-variant', variant);
		}
		expect(marker).toHaveClass('consumer-marker');
		expect(marker).not.toHaveAttribute('role');
		expect(marker).not.toHaveAttribute('tabindex');
		expect(marker).toHaveTextContent('Today');
	});
	it('keeps exactly one explicit status and its spinner/icon decorative', async () => {
		const view = await render(Host);
		expect(screen.getAllByRole('status')).toHaveLength(1);
		expect(view.container.querySelector('caps-marker-icon')).toHaveAttribute('aria-hidden', 'true');
		expect(view.container.querySelector('caps-spinner')).toHaveAttribute('aria-hidden', 'true');
	});
	it('retains native link attributes, full-surface keyboard action and disabled/form behavior', async () => {
		const view = await render(Host);
		const user = userEvent.setup();
		const action = screen.getByRole('button', { name: 'Revert change' });
		action.focus();
		await user.keyboard('[Enter]');
		await user.keyboard('[Space]');
		expect(view.fixture.componentInstance.actions).toBe(2);
		expect(view.fixture.componentInstance.submissions).toBe(0);
		view.fixture.componentInstance.disabled.set(true);
		view.detectChanges();
		expect(action).toBeDisabled();
		expect(screen.getByRole('link', { name: 'Full run' })).toHaveAttribute('href', '#run');
		expect(screen.getByRole('link', { name: 'Full run' })).toHaveAttribute('download', 'run.txt');
		expect(view.container.querySelector('button button,button a,a button,a a')).toBeNull();
	});
});
