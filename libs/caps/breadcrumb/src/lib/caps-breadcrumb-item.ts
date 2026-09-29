import { NgTemplateOutlet } from '@angular/common';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChild,
	inject,
	input,
} from '@angular/core';
import { CAPS_LINK_CONTEXT, CapsLink, type CapsLinkContext } from '@capsule-ng/caps/link';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { classes } from '@spartan-ng/helm/utils';
import { CAPS_BREADCRUMB } from './caps-breadcrumb.token';

type CurrentInput = boolean | '' | 'true' | 'false' | null | undefined;

function optionalBooleanAttribute(value: CurrentInput): boolean | undefined {
	return value === undefined || value === null ? undefined : booleanAttribute(value);
}

/**
 * An item of a `<caps-breadcrumb>`. Set `href` to render the item's content inside a native `<a>`
 * styled as a breadcrumb link; without it, the content is rendered as is (plain text for the
 * current page, or e.g. a dropdown trigger). For router navigation, project an
 * `<a capsLink routerLink>` instead: the item styles it and sets its `aria-current`.
 *
 * Items must be direct content of the breadcrumb, and a projected `capsLink` must be in the item's
 * own content (not inside another component's template), so the item can find it.
 */
@Component({
	selector: 'caps-breadcrumb-item',
	imports: [NgTemplateOutlet, NgIcon, CapsLink],
	providers: [provideIcons({ lucideChevronRight }), { provide: CAPS_LINK_CONTEXT, useExisting: CapsBreadcrumbItem }],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'breadcrumb-item',
		role: 'listitem',
		'[attr.aria-current]': '_hostAriaCurrent()',
	},
	template: `
		@if (!_isFirst()) {
			<span
				data-slot="breadcrumb-separator"
				role="presentation"
				aria-hidden="true"
				class="caps-breadcrumb-separator flex"
			>
				<ng-icon name="lucideChevronRight" class="rtl:rotate-180" />
			</span>
		}
		<ng-template #content><ng-content /></ng-template>
		@if (_hasHref()) {
			<a capsLink [href]="href()"><ng-container *ngTemplateOutlet="content" /></a>
		} @else {
			<ng-container *ngTemplateOutlet="content" />
		}
	`,
})
export class CapsBreadcrumbItem implements CapsLinkContext {
	private readonly _breadcrumb = inject(CAPS_BREADCRUMB);

	private readonly _link = contentChild(CapsLink, { descendants: true });

	private readonly _index = computed(() => this._breadcrumb.items().indexOf(this));

	/**
	 * Whether this item is the current page. When unset, the last item is the current page, unless
	 * another item is explicitly marked as current.
	 */
	public readonly current = input<boolean | undefined, CurrentInput>(undefined, {
		transform: optionalBooleanAttribute,
	});

	/**
	 * URL of the item. Renders the content inside a native `<a href>`. For router navigation, project
	 * an `<a capsLink routerLink>` instead.
	 */
	public readonly href = input<string | null | undefined>(undefined);

	public readonly variant = 'breadcrumb' as const;

	public readonly isCurrent = computed(() => {
		const current = this.current();
		if (current !== undefined) return current;

		const items = this._breadcrumb.items();
		const index = this._index();
		const isLast = index >= 0 && index === items.length - 1;
		return isLast && !items.some((item) => item.current() === true);
	});

	protected readonly _isFirst = computed(() => this._index() <= 0);

	/** Whether the item renders its own link. */
	protected readonly _hasHref = computed(() => this.href() != null);

	/**
	 * `aria-current` goes on the item's link (its own `href` link, or a projected capsLink) when there is one,
	 * otherwise on the item itself.
	 */
	protected readonly _hostAriaCurrent = computed(() =>
		this.isCurrent() && !this._hasHref() && !this._link() ? 'page' : null,
	);

	constructor() {
		classes(() => 'caps-breadcrumb-item inline-flex items-center');
	}
}
