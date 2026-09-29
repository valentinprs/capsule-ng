import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsLinkImports } from '@capsule-ng/caps/link';
import { CapsBreadcrumbImports } from '../index';

@Component({
	selector: 'caps-breadcrumb-host',
	imports: [CapsBreadcrumbImports, CapsLinkImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-breadcrumb [aria-label]="label()" class="text-lg">
			<caps-breadcrumb-item>
				<a capsLink href="/">Home</a>
			</caps-breadcrumb-item>
			<caps-breadcrumb-item>
				<a capsLink href="/components">Components</a>
			</caps-breadcrumb-item>
			<caps-breadcrumb-item>Breadcrumb</caps-breadcrumb-item>
		</caps-breadcrumb>
	`,
})
class BreadcrumbHost {
	public readonly label = input('breadcrumb');
}

@Component({
	selector: 'caps-breadcrumb-current-host',
	imports: [CapsBreadcrumbImports, CapsLinkImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-breadcrumb>
			<caps-breadcrumb-item [current]="homeCurrent()">
				<a capsLink href="/">Home</a>
			</caps-breadcrumb-item>
			<caps-breadcrumb-item [current]="lastCurrent()">
				<a capsLink href="/components">Components</a>
			</caps-breadcrumb-item>
		</caps-breadcrumb>
	`,
})
class CurrentHost {
	public readonly homeCurrent = input<boolean | undefined>(undefined);
	public readonly lastCurrent = input<boolean | undefined>(undefined);
}

function renderCurrent(inputs: { homeCurrent?: boolean; lastCurrent?: boolean } = {}) {
	const fixture = TestBed.createComponent(CurrentHost);
	for (const [name, value] of Object.entries(inputs)) fixture.componentRef.setInput(name, value);
	fixture.detectChanges();
	const root: HTMLElement = fixture.nativeElement;
	return {
		items: Array.from(root.querySelectorAll<HTMLElement>('caps-breadcrumb-item')),
		links: Array.from(root.querySelectorAll<HTMLAnchorElement>('a')),
	};
}

@Component({
	selector: 'caps-breadcrumb-dynamic-host',
	imports: [CapsBreadcrumbImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-breadcrumb>
			@for (label of labels(); track label) {
				<caps-breadcrumb-item>{{ label }}</caps-breadcrumb-item>
			}
		</caps-breadcrumb>
	`,
})
class DynamicHost {
	public readonly labels = input<string[]>([]);
}

function render(inputs: { label?: string } = {}) {
	const fixture = TestBed.createComponent(BreadcrumbHost);
	if (inputs.label !== undefined) fixture.componentRef.setInput('label', inputs.label);
	fixture.detectChanges();
	const root: HTMLElement = fixture.nativeElement;
	return {
		breadcrumb: root.querySelector('caps-breadcrumb') as HTMLElement,
		items: Array.from(root.querySelectorAll<HTMLElement>('caps-breadcrumb-item')),
	};
}

describe('caps-breadcrumb', () => {
	describe('roles', () => {
		it('is a navigation landmark labelled "breadcrumb" by default', () => {
			const { breadcrumb } = render();

			expect(breadcrumb.getAttribute('role')).toBe('navigation');
			expect(breadcrumb.getAttribute('aria-label')).toBe('breadcrumb');
		});

		it('accepts a custom aria-label', () => {
			expect(render({ label: 'Fil d’Ariane' }).breadcrumb.getAttribute('aria-label')).toBe('Fil d’Ariane');
		});

		it('renders the items as listitems of an internal list', () => {
			const { breadcrumb, items } = render();
			const list = breadcrumb.querySelector('[role="list"]');

			expect(list).not.toBeNull();
			expect(items).toHaveLength(3);
			for (const item of items) {
				expect(item.getAttribute('role')).toBe('listitem');
				expect(item.parentElement).toBe(list);
			}
		});
	});

	describe('separators', () => {
		const separatorsOf = (el: HTMLElement) => el.querySelectorAll('[data-slot="breadcrumb-separator"]');

		it('inserts a separator between consecutive items only', () => {
			const { breadcrumb, items } = render();

			expect(separatorsOf(breadcrumb)).toHaveLength(2);
			expect(separatorsOf(items[0])).toHaveLength(0);
			expect(separatorsOf(items[1])).toHaveLength(1);
			expect(separatorsOf(items[2])).toHaveLength(1);
			// A separator sits between two items: it precedes the item's own content.
			expect(items[1].firstElementChild?.getAttribute('data-slot')).toBe('breadcrumb-separator');
		});

		it('is decorative and defaults to a chevron', () => {
			const [separator] = Array.from(separatorsOf(render().breadcrumb));

			expect(separator.getAttribute('role')).toBe('presentation');
			expect(separator.getAttribute('aria-hidden')).toBe('true');
			expect(separator.querySelector('ng-icon')?.getAttribute('name')).toBe('lucideChevronRight');
		});

		it('mirrors the default chevron in RTL contexts', () => {
			const [separator] = Array.from(separatorsOf(render().breadcrumb));

			expect(separator.querySelector('ng-icon')?.classList).toContain('rtl:rotate-180');
		});
	});

	describe('current item', () => {
		it('marks the last item as the current page by default, on the item host when it has no link', () => {
			const { items } = render();

			expect(items.map((item) => item.getAttribute('aria-current'))).toEqual([null, null, 'page']);
		});

		it('puts aria-current on the capsLink of the current item rather than on its host', () => {
			const { items, links } = renderCurrent();

			expect(links.map((link) => link.getAttribute('aria-current'))).toEqual([null, 'page']);
			expect(items.every((item) => !item.hasAttribute('aria-current'))).toBe(true);
		});

		it('lets the current input make another item the current page instead of the last one', () => {
			const { links } = renderCurrent({ homeCurrent: true });

			expect(links.map((link) => link.getAttribute('aria-current'))).toEqual(['page', null]);
		});

		it('lets the current input opt the last item out', () => {
			const { links } = renderCurrent({ lastCurrent: false });

			expect(links.every((link) => !link.hasAttribute('aria-current'))).toBe(true);
		});
	});

	describe('links', () => {
		it('applies the breadcrumb variant to capsLink', () => {
			const { links } = renderCurrent();

			for (const link of links) {
				expect(link.classList).toContain('caps-link-variant-breadcrumb');
				expect(link.classList).not.toContain('caps-link-variant-default');
			}
		});
	});

	it('merges the consumer class on the host', () => {
		expect(render().breadcrumb.classList).toContain('text-lg');
	});

	it('keeps separators and the current item in sync when items change', () => {
		const fixture = TestBed.createComponent(DynamicHost);
		fixture.componentRef.setInput('labels', ['Home', 'Docs']);
		fixture.detectChanges();
		fixture.componentRef.setInput('labels', ['Home', 'Docs', 'Breadcrumb']);
		fixture.detectChanges();

		const items = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('caps-breadcrumb-item'));
		expect(items.map((item) => item.getAttribute('aria-current'))).toEqual([null, null, 'page']);
		expect(items.map((item) => item.querySelectorAll('[data-slot="breadcrumb-separator"]').length)).toEqual([0, 1, 1]);
	});
});
