import { NgTemplateOutlet } from '@angular/common';
import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	computed,
	DestroyRef,
	DOCUMENT,
	inject,
	input,
	TemplateRef,
	viewChild,
} from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsSheet, CapsSheetImports } from '@capsule-ng/caps/sheet';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMenu } from '@ng-icons/lucide';
import { classes } from '@spartan-ng/helm/utils';
import type { CapsHeaderMenu } from './caps-header-menu';

/** Matches the Tailwind `md` breakpoint, where the navigation moves into the bar. */
const DESKTOP_QUERY = '(min-width: 48rem)';

/**
 * @internal Rendered by `caps-header`: the menu button shown below the `md` breakpoint. It opens a
 * left Sheet holding the `*capsHeaderNav` navigation. Following a link inside closes the sheet,
 * and so does growing past the breakpoint.
 */
@Component({
	selector: 'caps-header-menu-sheet',
	imports: [CapsSheetImports, CapsButton, NgIcon, NgTemplateOutlet],
	providers: [provideIcons({ lucideMenu })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'header-menu' },
	template: `
		<caps-sheet>
			<button capsSheetTrigger capsButton variant="ghost" size="icon" type="button" [attr.aria-label]="_label()">
				<ng-icon name="lucideMenu" aria-hidden="true" />
			</button>
			<ng-template capsSheetContent side="left" [class]="'caps-header-menu-panel'">
				<caps-sheet-header>
					<caps-sheet-title>{{ _title() }}</caps-sheet-title>
					@if (texts()?.description(); as description) {
						<caps-sheet-description>{{ description }}</caps-sheet-description>
					}
				</caps-sheet-header>
				<div class="caps-header-menu-content" data-slot="header-menu-content" (click)="_closeOnLink($event)">
					<ng-container [ngTemplateOutlet]="navigation()" />
				</div>
			</ng-template>
		</caps-sheet>
	`,
})
export class CapsHeaderMenuSheet {
	public readonly navigation = input.required<TemplateRef<unknown>>();
	public readonly texts = input<CapsHeaderMenu>();

	protected readonly _label = computed(() => this.texts()?.label() ?? 'Open navigation');
	protected readonly _title = computed(() => this.texts()?.title() ?? 'Navigation');

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
