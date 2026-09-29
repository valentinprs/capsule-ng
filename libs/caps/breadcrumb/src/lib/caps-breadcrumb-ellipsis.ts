import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEllipsis } from '@ng-icons/lucide';
import { classes } from '@spartan-ng/helm/utils';

/**
 * Marks collapsed items of a `<caps-breadcrumb>`. Place it manually, e.g. inside a
 * `<caps-breadcrumb-item>` or inside a `<button capsButton>` that opens a menu of the hidden items.
 * The icon is decorative; only the visually hidden text is exposed to assistive technologies.
 */
@Component({
	selector: 'caps-breadcrumb-ellipsis',
	imports: [NgIcon],
	providers: [provideIcons({ lucideEllipsis })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'breadcrumb-ellipsis',
	},
	template: `
		<ng-icon name="lucideEllipsis" aria-hidden="true" />
		<span class="sr-only">{{ srOnlyText() }}</span>
	`,
})
export class CapsBreadcrumbEllipsis {
	/** Visually hidden text announced by screen readers in place of the icon. */
	public readonly srOnlyText = input<string>('More');

	constructor() {
		classes(() => 'caps-breadcrumb-ellipsis flex items-center justify-center');
	}
}
