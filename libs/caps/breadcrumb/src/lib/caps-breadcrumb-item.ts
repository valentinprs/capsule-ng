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
 * An item of a `<caps-breadcrumb>`. Items must be direct content of the breadcrumb, and an item's
 * `capsLink` must be in the item's own content (not inside another component's template), so the
 * breadcrumb and the item can find them.
 */
@Component({
	selector: 'caps-breadcrumb-item',
	imports: [NgIcon],
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
				<ng-icon name="lucideChevronRight" />
			</span>
		}
		<ng-content />
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

	/** `aria-current` goes on the item's capsLink when there is one, otherwise on the item itself. */
	protected readonly _hostAriaCurrent = computed(() => (this.isCurrent() && !this._link() ? 'page' : null));

	constructor() {
		classes(() => 'caps-breadcrumb-item inline-flex items-center');
	}
}
