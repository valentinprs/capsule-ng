import { ChangeDetectionStrategy, Component, contentChildren, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { CapsBreadcrumbItem } from './caps-breadcrumb-item';
import { CAPS_BREADCRUMB, type CapsBreadcrumbContext } from './caps-breadcrumb.token';

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

	public readonly items = contentChildren(CapsBreadcrumbItem);

	constructor() {
		classes(() => 'caps-breadcrumb block');
	}
}
