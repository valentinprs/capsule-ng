import { ChangeDetectionStrategy, Component, computed, contentChild, contentChildren, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { CapsBreadcrumbItem } from './caps-breadcrumb-item';
import { CapsBreadcrumbSeparator } from './caps-breadcrumb-separator';
import {
	CAPS_BREADCRUMB,
	type CapsBreadcrumbContext,
	type CapsBreadcrumbSeparatorContent,
} from './caps-breadcrumb.token';

@Component({
	selector: 'caps-breadcrumb',
	providers: [{ provide: CAPS_BREADCRUMB, useExisting: CapsBreadcrumb }],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'breadcrumb',
		role: 'navigation',
		'[attr.aria-label]': 'ariaLabel()',
	},
	template: `
		<div
			role="list"
			data-slot="breadcrumb-list"
			class="caps-breadcrumb-list flex flex-wrap items-center wrap-break-word"
		>
			<ng-content />
		</div>
	`,
})
export class CapsBreadcrumb implements CapsBreadcrumbContext {
	/** Accessible name of the navigation landmark. */
	public readonly ariaLabel = input<string>('breadcrumb', { alias: 'aria-label' });

	/**
	 * Custom separator rendered between every pair of items: plain text or a template. Takes
	 * precedence over a `capsBreadcrumbSeparator` content template. When neither is set, a chevron
	 * is rendered, mirrored in RTL contexts. Custom separators are not mirrored.
	 */
	public readonly separator = input<CapsBreadcrumbSeparatorContent | null | undefined>(undefined);

	public readonly items = contentChildren(CapsBreadcrumbItem);

	private readonly _separatorTemplate = contentChild(CapsBreadcrumbSeparator);

	public readonly separatorContent = computed(() => this.separator() ?? this._separatorTemplate()?.template ?? null);

	constructor() {
		classes(() => 'caps-breadcrumb block');
	}
}
