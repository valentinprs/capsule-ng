import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { CapsDialogImports, CapsDialogRef, CapsDialogService, injectCapsDialogContext } from '../index';
@Component({
	selector: 'caps-dynamic-test-body',
	imports: [CapsDialogImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-dialog-title>Select user</caps-dialog-title>
		<button (click)="ref.close(name)">{{ name }}</button>
	`,
})
class Body {
	public readonly name = injectCapsDialogContext<{ name: string }>().name;
	public readonly ref = inject<CapsDialogRef<string>>(CapsDialogRef);
}
@Component({
	selector: 'caps-dynamic-test',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button (click)="show()">Choose</button>
	`,
})
class Host {
	public readonly service = inject(CapsDialogService);
	public result: string | undefined;
	show() {
		this.service.open<string>(Body, { context: { name: 'Alice' } }).closed$.subscribe((value) => (this.result = value));
	}
}
it('renders dynamic content with Capsule context and returns the explicit result', async () => {
	const { fixture } = await render(Host);
	await userEvent.click(screen.getByRole('button', { name: 'Choose' }));
	await screen.findByRole('dialog', { name: 'Select user' });
	await userEvent.click(screen.getByRole('button', { name: 'Alice' }));
	await waitFor(() => expect(fixture.componentInstance.result).toBe('Alice'));
});
