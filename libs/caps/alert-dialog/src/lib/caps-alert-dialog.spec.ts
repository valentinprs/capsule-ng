import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { CapsAlertDialogImports } from '../index';

@Component({
	selector: 'caps-alert-dialog-test',
	imports: [CapsAlertDialogImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-alert-dialog [(open)]="open">
			<button capsAlertDialogTrigger>Delete</button>
			<ng-template capsAlertDialogContent>
				<caps-alert-dialog-title>Delete project?</caps-alert-dialog-title>
				<caps-alert-dialog-description>This cannot be undone.</caps-alert-dialog-description>
				<button (click)="attempts.set(attempts() + 1)">Confirm</button>
				<button capsAlertDialogCancel>Cancel</button>
			</ng-template>
		</caps-alert-dialog>
	`,
})
class AlertHost {
	public readonly open = signal(false);
	public readonly attempts = signal(0);
}

describe('Capsule Alert Dialog public composition', () => {
	it('focuses Cancel, ignores the backdrop and lets the application decide when confirmation closes', async () => {
		const { fixture } = await render(AlertHost);
		await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
		const dialog = await screen.findByRole('alertdialog', { name: 'Delete project?' });
		await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Cancel' })));
		const backdrop = document.querySelector<HTMLElement>('.cdk-overlay-backdrop');
		if (!backdrop) throw new Error('Missing backdrop');
		await userEvent.click(backdrop);
		expect(screen.getByRole('alertdialog')).toBe(dialog);
		await userEvent.click(screen.getByRole('button', { name: 'Confirm' }));
		expect(fixture.componentInstance.attempts()).toBe(1);
		expect(fixture.componentInstance.open()).toBe(true);
		fixture.componentInstance.open.set(false);
		fixture.detectChanges();
		await waitFor(() => expect(screen.queryByRole('alertdialog')).toBeNull());
	});
});
