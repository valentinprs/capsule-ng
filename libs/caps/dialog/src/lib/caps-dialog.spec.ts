import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { CapsDialogImports } from '../index';

@Component({
	selector: 'caps-dialog-test',
	imports: [CapsDialogImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-dialog [(open)]="open" [disableClose]="disableClose()">
			<button capsDialogTrigger>Edit</button>
			<ng-template capsDialogContent>
				<caps-dialog-title>Edit profile</caps-dialog-title>
				<caps-dialog-description>Your public profile.</caps-dialog-description>
				<button capsDialogClose>Cancel</button>
			</ng-template>
		</caps-dialog>
	`,
})
class DialogHost {
	public readonly open = signal(false);
	public readonly disableClose = signal(false);
}

describe('Capsule Dialog public composition', () => {
	it('opens lazily with an accessible name and description, and synchronizes dismissal', async () => {
		const { fixture } = await render(DialogHost);
		expect(screen.queryByText('Your public profile.')).toBeNull();
		await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
		const dialog = await screen.findByRole('dialog', { name: 'Edit profile' });
		expect(dialog.getAttribute('aria-describedby')).toBe(screen.getByText('Your public profile.').id);
		expect(fixture.componentInstance.open()).toBe(true);
		await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
		await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
		expect(fixture.componentInstance.open()).toBe(false);
		expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Edit' }));
	});
});

it('honors controlled opening, traps keyboard focus and restores it on Escape', async () => {
	const { fixture } = await render(DialogHost);
	const trigger = screen.getByRole('button', { name: 'Edit' });
	trigger.focus();
	fixture.componentInstance.open.set(true);
	fixture.detectChanges();
	const dialog = await screen.findByRole('dialog');
	await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
	await userEvent.tab({ shift: true });
	expect(dialog.contains(document.activeElement)).toBe(true);
	await userEvent.tab();
	expect(dialog.contains(document.activeElement)).toBe(true);
	await userEvent.keyboard('{Escape}');
	await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
	expect(fixture.componentInstance.open()).toBe(false);
	expect(document.activeElement).toBe(trigger);
});
it('blocks user dismissal when disabled while retaining explicit close', async () => {
	const { fixture } = await render(DialogHost);
	fixture.componentInstance.disableClose.set(true);
	fixture.detectChanges();
	await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
	await screen.findByRole('dialog');
	await userEvent.keyboard('{Escape}');
	expect(screen.getByRole('dialog')).toBeTruthy();
	await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
	await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
});
