import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import '@testing-library/jest-dom/vitest';
import { userEvent } from '@vitest/browser/context';
import axe from 'axe-core';
import { CapsAccordionImports, type CapsAccordionSelection } from '../index';

@Component({
	selector: 'caps-accordion-test',
	imports: [CapsAccordionImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-template #title let-count="count">
			Shipping
			<span>{{ count }} options</span>
		</ng-template>
		<caps-accordion [disabled]="disabled()" [skeleton]="skeleton()" align="start" [size]="size()" isFlush>
			<caps-accordion-item
				id="shipping-panel"
				[title]="title"
				[context]="{ count: 3 }"
				[expanded]="shipping()"
				(selected)="select($event)"
			>
				<label for="address">Address</label>
				<input id="address" [formControl]="address" />
				@if (extra()) {
					<p style="height: 100px">Extra details</p>
				}
			</caps-accordion-item>
			<caps-accordion-item title="Unavailable" disabled>Restricted</caps-accordion-item>
			<caps-accordion-item title="Returns">Contact support</caps-accordion-item>
		</caps-accordion>
	`,
})
class Host {
	public readonly size = signal<'sm' | 'md' | 'lg'>('lg');
	public readonly disabled = signal(false);
	public readonly skeleton = signal(false);
	public readonly shipping = signal(false);
	public readonly extra = signal(false);
	public readonly address = new FormControl('');
	public readonly events: CapsAccordionSelection[] = [];
	public select(event: CapsAccordionSelection): void {
		this.events.push(event);
		this.shipping.set(event.expanded);
	}
}

describe('CapsAccordion public Carbon Angular composition', () => {
	it('owns one native button per item, projects a contextual title and names the content region', async () => {
		const view = await render(Host);
		const trigger = screen.getByRole('button', { name: 'Shipping 3 options' });
		const panel = view.container.querySelector('#shipping-panel')!;
		expect(trigger.tagName).toBe('BUTTON');
		expect(trigger.parentElement?.tagName).toBe('H3');
		expect(trigger).toHaveAttribute('aria-controls', panel.id);
		expect(panel).toHaveAttribute('aria-labelledby', trigger.id);
		expect(panel).toHaveAttribute('role', 'region');
		expect(panel).toHaveAttribute('inert');
		expect(view.container.querySelectorAll('[role="list"] > [role="listitem"]')).toHaveLength(3);
		expect(view.container.querySelectorAll('button button')).toHaveLength(0);
		expect((await axe.run(view.container)).violations).toEqual([]);
	});
	it('supports controlled and independent expansion, emitting only the selected item and preserving input editing', async () => {
		const view = await render(Host);
		const user = userEvent.setup();
		const trigger = screen.getByRole('button', { name: 'Shipping 3 options' });
		await user.click(trigger);
		view.detectChanges();
		expect(view.fixture.componentInstance.events).toEqual([{ id: 'shipping-panel', expanded: true }]);
		await user.click(screen.getByRole('button', { name: 'Returns' }));
		view.detectChanges();
		expect(trigger).toHaveAttribute('aria-expanded', 'true');
		expect(screen.getByRole('button', { name: 'Returns' })).toHaveAttribute('aria-expanded', 'true');
		await user.type(screen.getByLabelText('Address'), 'Paris{arrowleft}{enter}');
		expect(view.fixture.componentInstance.address.value).toBe('Paris');
		expect(trigger).toHaveAttribute('aria-expanded', 'true');
		view.fixture.componentInstance.shipping.set(false);
		view.detectChanges();
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
		expect(view.fixture.componentInstance.events).toHaveLength(1);
	});
	it('uses Enter/Space once, navigates with arrows/Home/End, skips disabled items, and keeps closed content out of Tab order', async () => {
		const view = await render(Host);
		const user = userEvent.setup();
		const trigger = screen.getByRole('button', { name: 'Shipping 3 options' });
		const returns = screen.getByRole('button', { name: 'Returns' });
		trigger.focus();
		await user.keyboard('[Enter]');
		view.detectChanges();
		expect(trigger).toHaveAttribute('aria-expanded', 'true');
		expect(view.fixture.componentInstance.events).toHaveLength(1);
		await user.keyboard('[Space]');
		view.detectChanges();
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
		expect(view.fixture.componentInstance.events).toHaveLength(2);
		await user.tab();
		expect(returns).toHaveFocus();
		await user.keyboard('[Home]');
		expect(trigger).toHaveFocus();
		await user.keyboard('[ArrowDown]');
		expect(returns).toHaveFocus();
		await user.keyboard('[ArrowUp]');
		expect(trigger).toHaveFocus();
		await user.keyboard('[End]');
		expect(returns).toHaveFocus();
		await user.keyboard('{Control>}[ArrowUp]{/Control}');
		expect(returns).toHaveFocus();
	});
	it('updates size and cascades root disabled/skeleton without emitting selected or overwriting item disabled', async () => {
		const view = await render(Host);
		const user = userEvent.setup();
		const trigger = screen.getByRole('button', { name: 'Shipping 3 options' });
		await user.click(trigger);
		view.detectChanges();
		const root = view.container.querySelector('caps-accordion')!;
		expect(root).toHaveAttribute('data-size', 'lg');
		view.fixture.componentInstance.size.set('sm');
		view.detectChanges();
		expect(root).toHaveAttribute('data-size', 'sm');
		view.fixture.componentInstance.disabled.set(true);
		view.detectChanges();
		expect(trigger).toBeDisabled();
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
		expect(screen.getByRole('button', { name: 'Returns' })).toBeDisabled();
		view.fixture.componentInstance.disabled.set(false);
		view.detectChanges();
		expect(trigger).not.toBeDisabled();
		expect(screen.getByRole('button', { name: 'Unavailable' })).toBeDisabled();
		view.fixture.componentInstance.skeleton.set(true);
		view.detectChanges();
		expect(view.container.querySelectorAll('.caps-accordion-skeleton-title')).toHaveLength(3);
		expect(view.container.querySelector('input')).toBeNull();
		expect(screen.getAllByRole('button', { name: 'Loading' })).toHaveLength(3);
		expect(trigger).toHaveAttribute('aria-expanded', 'true');
		expect(view.fixture.componentInstance.events).toEqual([{ id: 'shipping-panel', expanded: true }]);
	});
	it('retains a disabled item’s externally expanded state without allowing user activation', async () => {
		const view = await render(
			`<caps-accordion><caps-accordion-item title="Locked" expanded disabled>Read-only details</caps-accordion-item></caps-accordion>`,
			{ imports: [...CapsAccordionImports] },
		);
		const trigger = screen.getByRole('button', { name: 'Locked' });
		expect(trigger).toBeDisabled();
		expect(trigger).toHaveAttribute('aria-expanded', 'true');
		trigger.click();
		view.detectChanges();
		expect(trigger).toHaveAttribute('aria-expanded', 'true');
	});
	it('creates distinct content/trigger associations across multiple roots', async () => {
		const view = await render(
			`<caps-accordion><caps-accordion-item title="A">A</caps-accordion-item></caps-accordion><caps-accordion><caps-accordion-item title="B">B</caps-accordion-item></caps-accordion>`,
			{ imports: [...CapsAccordionImports] },
		);
		const [a, b] = screen.getAllByRole('button');
		expect(a.id).not.toBe(b.id);
		expect(a.getAttribute('aria-controls')).not.toBe(b.getAttribute('aria-controls'));
		for (const button of [a, b])
			expect(view.container.querySelector('#' + button.getAttribute('aria-controls'))).toHaveAttribute(
				'aria-labelledby',
				button.id,
			);
	});
	it('does not steal editable keyboard events when a panel contains controls', async () => {
		const view = await render(Host);
		view.fixture.componentInstance.shipping.set(true);
		view.detectChanges();
		const input = screen.getByLabelText('Address');
		input.focus();
		const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true });
		fireEvent(input, event);
		expect(event.defaultPrevented).toBe(false);
		expect(input).toHaveFocus();
		const panel = view.container.querySelector('#shipping-panel')!;
		await waitFor(() =>
			expect(
				parseFloat((panel as HTMLElement).style.getPropertyValue('--brn-accordion-content-height')),
			).toBeGreaterThan(0),
		);
		const before = parseFloat((panel as HTMLElement).style.getPropertyValue('--brn-accordion-content-height'));
		view.fixture.componentInstance.extra.set(true);
		view.detectChanges();
		await waitFor(() =>
			expect(
				parseFloat((panel as HTMLElement).style.getPropertyValue('--brn-accordion-content-height')),
			).toBeGreaterThan(before),
		);
		view.fixture.componentInstance.extra.set(false);
		view.detectChanges();
		await waitFor(() =>
			expect(parseFloat((panel as HTMLElement).style.getPropertyValue('--brn-accordion-content-height'))).toBeLessThan(
				before + 100,
			),
		);
	});
});
