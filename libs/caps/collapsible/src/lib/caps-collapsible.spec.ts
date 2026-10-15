import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { render, screen, waitFor } from '@testing-library/angular';
import '@testing-library/jest-dom/vitest';
import { userEvent } from '@vitest/browser/context';
import axe from 'axe-core';
import { CapsCollapsibleImports } from '../index';

@Component({
	selector: 'caps-collapsible-test',
	imports: [CapsCollapsibleImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form>
			<caps-collapsible [(expanded)]="expanded" [disabled]="disabled()">
				<button capsCollapsibleTrigger>Details</button>
				<caps-collapsible-content id="project-details"><a href="#project">Project</a></caps-collapsible-content>
			</caps-collapsible>
			<button type="button">Next</button>
		</form>
	`,
})
class Host {
	public readonly expanded = signal(false);
	public readonly disabled = signal(false);
}

describe('CapsCollapsible native composition', () => {
	it('links trigger/content, activates once with native Enter/Space, and keeps closed content inert', async () => {
		const view = await render(Host);
		const user = userEvent.setup();
		const trigger = screen.getByRole('button', { name: 'Details' });
		expect(trigger).toHaveAttribute('type', 'button');
		expect(trigger).toHaveAttribute('aria-controls', 'project-details');
		expect(view.container.querySelector('#project-details')).toHaveAttribute('inert');
		trigger.focus();
		await user.keyboard('[Enter]');
		view.detectChanges();
		expect(view.fixture.componentInstance.expanded()).toBe(true);
		expect(trigger).toHaveAttribute('aria-expanded', 'true');
		await user.tab();
		expect(screen.getByRole('link', { name: 'Project' })).toHaveFocus();
		trigger.focus();
		await user.keyboard('[Space]');
		view.detectChanges();
		expect(view.fixture.componentInstance.expanded()).toBe(false);
		await user.tab();
		expect(screen.getByRole('button', { name: 'Next' })).toHaveFocus();
		expect((await axe.run(view.container)).violations).toEqual([]);
	});
	it('accepts external state and preserves native disabled without submitting a surrounding form', async () => {
		const view = await render(Host);
		const submitted = vi.fn();
		view.container.querySelector('form')!.addEventListener('submit', submitted);
		const trigger = screen.getByRole('button', { name: 'Details' });
		view.fixture.componentInstance.expanded.set(true);
		view.detectChanges();
		expect(trigger).toHaveAttribute('aria-expanded', 'true');
		view.fixture.componentInstance.disabled.set(true);
		view.detectChanges();
		trigger.click();
		view.detectChanges();
		expect(trigger).toBeDisabled();
		expect(view.fixture.componentInstance.expanded()).toBe(true);
		expect(submitted).not.toHaveBeenCalled();
	});
	it('keeps uncontrolled nested sections independent with distinct generated IDs', async () => {
		const view = await render(
			`<caps-collapsible><button capsCollapsibleTrigger>Outer</button><caps-collapsible-content><caps-collapsible><button capsCollapsibleTrigger>Inner</button><caps-collapsible-content>Nested</caps-collapsible-content></caps-collapsible></caps-collapsible-content></caps-collapsible>`,
			{ imports: [...CapsCollapsibleImports] },
		);
		const user = userEvent.setup();
		const outer = screen.getByRole('button', { name: 'Outer' });
		await user.click(outer);
		view.detectChanges();
		await waitFor(() =>
			expect(view.container.querySelector(`#${outer.getAttribute('aria-controls')}`)).not.toHaveAttribute('inert'),
		);
		const inner = screen.getByRole('button', { name: 'Inner' });
		expect(outer.getAttribute('aria-controls')).not.toBe(inner.getAttribute('aria-controls'));
		await user.click(inner);
		view.detectChanges();
		expect(inner).toHaveAttribute('aria-expanded', 'true');
		expect(outer).toHaveAttribute('aria-expanded', 'true');
	});
});
