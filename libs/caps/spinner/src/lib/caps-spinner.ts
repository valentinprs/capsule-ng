import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-spinner',
	imports: [NgIcon],
	providers: [provideIcons({ lucideLoader2 })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'spinner',
		'[attr.role]': '!ariaHidden() ? "status" : null',
		'[attr.aria-label]': '!ariaHidden() ? ariaLabel() : null',
		'[attr.aria-hidden]': 'ariaHidden() ? true : null',
	},
	template: `
		<ng-icon [name]="icon()" size="1em" aria-hidden="true" />
	`,
})
export class CapsSpinner {
	/** Spartan Spinner custom icon support through provideIcons. */
	public readonly icon = input<string>('lucideLoader2');
	/** Spartan Spinner accessible name. */
	public readonly ariaLabel = input<string>('Loading', { alias: 'aria-label' });
	/** Native decorative semantics when a parent or nearby text already describes loading. */
	public readonly ariaHidden = input<boolean, unknown>(false, { alias: 'aria-hidden', transform: booleanAttribute });
	constructor() {
		classes(() => 'caps-spinner');
	}
}
