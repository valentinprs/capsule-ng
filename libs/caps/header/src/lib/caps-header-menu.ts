import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	DOCUMENT,
	inject,
	input,
	viewChild,
} from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsSheet, CapsSheetImports } from '@capsule-ng/caps/sheet';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMenu } from '@ng-icons/lucide';
import { classes } from '@spartan-ng/helm/utils';

/** Matches the Tailwind `md` breakpoint, where `caps-header-nav` takes over. */
const DESKTOP_QUERY = '(min-width: 48rem)';

/**
 * The menu button shown below the `md` breakpoint. It opens a left Sheet holding the projected
 * navigation. Following a link inside closes the sheet, and so does growing past the breakpoint.
 */
@Component({
	selector: 'caps-header-menu',
	imports: [CapsSheetImports, CapsButton, NgIcon],
	providers: [provideIcons({ lucideMenu })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'header-menu' },
	template: `
		<caps-sheet>
			<button capsSheetTrigger capsButton variant="ghost" size="icon" type="button" [attr.aria-label]="label()">
				<ng-icon name="lucideMenu" aria-hidden="true" />
			</button>
			<ng-template capsSheetContent side="left" [class]="'caps-header-menu-panel'">
				<caps-sheet-header>
					<caps-sheet-title>{{ title() }}</caps-sheet-title>
					@if (description()) {
						<caps-sheet-description>{{ description() }}</caps-sheet-description>
					}
				</caps-sheet-header>
				<div class="caps-header-menu-content" data-slot="header-menu-content" (click)="_closeOnLink($event)">
					<ng-content />
				</div>
			</ng-template>
		</caps-sheet>
	`,
})
export class CapsHeaderMenu {
	/** Accessible name of the menu button. */
	public readonly label = input('Open navigation');
	/** Title of the sheet, which also names the dialog. */
	public readonly title = input('Navigation');
	/** Optional description of the sheet. */
	public readonly description = input<string>();

	private readonly _sheet = viewChild.required(CapsSheet);

	constructor() {
		classes(() => 'caps-header-menu');
		const view = inject(DOCUMENT).defaultView;
		const destroyRef = inject(DestroyRef);
		afterNextRender(() => {
			const query = view?.matchMedia?.(DESKTOP_QUERY);
			if (!query) return;
			const closeOnDesktop = (event: MediaQueryListEvent) => {
				if (event.matches) this._sheet().close();
			};
			query.addEventListener('change', closeOnDesktop);
			destroyRef.onDestroy(() => query.removeEventListener('change', closeOnDesktop));
		});
	}

	protected _closeOnLink(event: MouseEvent): void {
		if ((event.target as Element | null)?.closest('a[href]')) this._sheet().close();
	}
}
