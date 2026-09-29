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

@Component({
	selector: 'caps-breadcrumb-separator-host',
	imports: [CapsBreadcrumbImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-template #bullet><b class="bullet">•</b></ng-template>
		<caps-breadcrumb [separator]="useBulletInput() ? bullet : separator()">
			@if (useContentTemplate()) {
				<ng-template capsBreadcrumbSeparator><i class="slash">/</i></ng-template>
			}
			@for (label of labels(); track label) {
				<caps-breadcrumb-item>{{ label }}</caps-breadcrumb-item>
			}
		</caps-breadcrumb>
	`,
})
class SeparatorHost {
	public readonly labels = input<string[]>(['Home', 'Components', 'Breadcrumb']);
	public readonly separator = input<string | undefined>(undefined);
	public readonly useBulletInput = input(false);
	public readonly useContentTemplate = input(false);
}

function renderSeparator(
	inputs: { labels?: string[]; separator?: string; useBulletInput?: boolean; useContentTemplate?: boolean } = {},
) {
	const fixture = TestBed.createComponent(SeparatorHost);
	for (const [name, value] of Object.entries(inputs)) fixture.componentRef.setInput(name, value);
	fixture.detectChanges();
	const root: HTMLElement = fixture.nativeElement;
	return {
		fixture,
		separators: () => Array.from(root.querySelectorAll<HTMLElement>('[data-slot="breadcrumb-separator"]')),
	};
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

		const expectDecorative = (separators: HTMLElement[]) => {
			for (const separator of separators) {
				expect(separator.getAttribute('role')).toBe('presentation');
				expect(separator.getAttribute('aria-hidden')).toBe('true');
				expect(separator.querySelector('ng-icon')).toBeNull();
			}
		};

		it('renders a text separator given through the separator input', () => {
			const { separators } = renderSeparator({ separator: '/' });

			expect(separators().map((s) => s.textContent?.trim())).toEqual(['/', '/']);
			expectDecorative(separators());
		});

		it('renders a separator template given through the separator input', () => {
			const { separators } = renderSeparator({ useBulletInput: true });

			expect(separators().map((s) => s.querySelector('.bullet')?.textContent)).toEqual(['•', '•']);
			expectDecorative(separators());
		});

		it('renders a capsBreadcrumbSeparator content template between every pair of items', () => {
			const { separators } = renderSeparator({ useContentTemplate: true });

			expect(separators().map((s) => s.querySelector('.slash')?.textContent)).toEqual(['/', '/']);
			expectDecorative(separators());
		});

		it('gives the separator input precedence over the content template', () => {
			const { separators } = renderSeparator({ useContentTemplate: true, separator: '>' });

			expect(separators().map((s) => s.textContent?.trim())).toEqual(['>', '>']);
		});

		it('does not mirror custom separators, which the consumer controls', () => {
			const { separators } = renderSeparator({ useContentTemplate: true });

			for (const separator of separators()) {
				expect(separator.outerHTML).not.toContain('rtl:');
			}
		});

		it('falls back to the default chevron when the custom separator is removed', () => {
			const { fixture, separators } = renderSeparator({ useContentTemplate: true, separator: '/' });
			fixture.componentRef.setInput('separator', undefined);
			fixture.componentRef.setInput('useContentTemplate', false);
			fixture.detectChanges();

			expect(separators().map((s) => s.querySelector('ng-icon')?.getAttribute('name'))).toEqual([
				'lucideChevronRight',
				'lucideChevronRight',
			]);
		});

		it('keeps a custom separator between every pair of items when items change', () => {
			const { fixture, separators } = renderSeparator({ useContentTemplate: true, labels: ['Home'] });
			expect(separators()).toHaveLength(0);

			fixture.componentRef.setInput('labels', ['Home', 'Docs', 'API', 'Breadcrumb']);
			fixture.detectChanges();

			expect(separators().map((s) => s.querySelector('.slash')?.textContent)).toEqual(['/', '/', '/']);
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
