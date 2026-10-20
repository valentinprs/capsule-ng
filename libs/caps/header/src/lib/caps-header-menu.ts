import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Optional texts of the menu button that `caps-header` shows below the `md` breakpoint when it
 * has a `*capsHeaderNav` navigation. The element itself renders nothing.
 */
@Component({
	selector: 'caps-header-menu',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { hidden: '' },
	template: '',
})
export class CapsHeaderMenu {
	/** Accessible name of the menu button. Default: `Open navigation`. */
	public readonly label = input<string>();
	/** Title of the sheet, which also names the dialog. Default: `Navigation`. */
	public readonly title = input<string>();
	/** Optional description of the sheet. */
	public readonly description = input<string>();
}
