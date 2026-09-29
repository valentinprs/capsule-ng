import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsBreadcrumbImports } from '../index';

@Component({
	selector: 'caps-breadcrumb-ellipsis-host',
	imports: [CapsBreadcrumbImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-breadcrumb>
			<caps-breadcrumb-item>
				@if (text(); as text) {
					<caps-breadcrumb-ellipsis [srOnlyText]="text" class="size-4" />
				} @else {
					<caps-breadcrumb-ellipsis />
				}
			</caps-breadcrumb-item>
			<caps-breadcrumb-item>Breadcrumb</caps-breadcrumb-item>
		</caps-breadcrumb>
	`,
})
class EllipsisHost {
	public readonly text = input<string | undefined>(undefined);
}

function render(inputs: { text?: string } = {}): HTMLElement {
	const fixture = TestBed.createComponent(EllipsisHost);
	if (inputs.text !== undefined) fixture.componentRef.setInput('text', inputs.text);
	fixture.detectChanges();
	return fixture.nativeElement.querySelector('caps-breadcrumb-ellipsis');
}

/** Text exposed to assistive technologies: the element's text, minus aria-hidden subtrees. */
function accessibleText(el: Element): string {
	const clone = el.cloneNode(true) as Element;
	for (const hidden of Array.from(clone.querySelectorAll('[aria-hidden="true"]'))) hidden.remove();
	return clone.textContent?.trim() ?? '';
}

describe('caps-breadcrumb-ellipsis', () => {
	it('exposes "More" as visually hidden text by default', () => {
		const ellipsis = render();
		const hiddenText = ellipsis.querySelector('.sr-only');

		expect(accessibleText(ellipsis)).toBe('More');
		expect(hiddenText?.textContent?.trim()).toBe('More');
	});

	it('accepts custom hidden text', () => {
		expect(accessibleText(render({ text: 'Show hidden pages' }))).toBe('Show hidden pages');
	});

	it('renders a decorative ellipsis icon', () => {
		const icon = render().querySelector('ng-icon');

		expect(icon?.getAttribute('name')).toBe('lucideEllipsis');
		expect(icon?.getAttribute('aria-hidden')).toBe('true');
	});

	it('carries no role of its own, so it can sit inside a button or a breadcrumb item', () => {
		expect(render().hasAttribute('role')).toBe(false);
	});

	it('merges the consumer class on the host', () => {
		const ellipsis = render({ text: 'More pages' });

		expect(ellipsis.classList).toContain('caps-breadcrumb-ellipsis');
		expect(ellipsis.classList).toContain('size-4');
	});
});
