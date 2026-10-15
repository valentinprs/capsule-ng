import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { CapsSheetImports } from '@capsule-ng/caps/sheet';
import { classes, hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';
import { CapsSidebarContext, CapsSidebarPortalContext } from './caps-sidebar-context';
import { CapsSidebarWrapper } from './caps-sidebar-wrapper';
import { CapsSidebarService, type SidebarVariant } from './caps-sidebar.service';
import { injectCapsSidebarConfig } from './caps-sidebar.token';
@Component({
	selector: 'caps-sidebar',
	imports: [NgTemplateOutlet, CapsSheetImports, CapsSidebarPortalContext],
	providers: [CapsSidebarContext],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'sidebar',
		'[attr.aria-label]': 'null',
		'[attr.aria-labelledby]': 'null',
		'[attr.data-state]': '_service.state()',
		'[attr.data-variant]': '_variant()',
		'[attr.data-side]': 'side()',
		'[attr.data-mobile]': '_service.isMobile()',
		'[attr.data-collapsible]': '_collapsed() ? collapsible() : ""',
	},
	template: `
		<ng-template #body><ng-content /></ng-template>
		@if (collapsible() === 'none') {
			<nav
				data-sidebar="sidebar"
				class="caps-sidebar-inner flex h-full flex-col"
				[attr.aria-label]="_label()"
				[attr.aria-labelledby]="_labelledBy()"
			>
				<ng-container [ngTemplateOutlet]="body" />
			</nav>
		} @else if (_service.isMobile()) {
			<caps-sheet [dir]="_direction()" [open]="_service.openMobile()" (openChange)="_service.setOpenMobile($event)">
				<ng-template capsSheetContent [side]="side()" [showCloseButton]="false" [class]="_mobileClass()">
					<caps-sheet-header class="sr-only">
						<caps-sheet-title>{{ srOnlySheetTitle() }}</caps-sheet-title>
						<caps-sheet-description>{{ srOnlySheetDescription() }}</caps-sheet-description>
					</caps-sheet-header>
					<nav
						capsSidebarPortalContext
						[attr.dir]="_direction()"
						[attr.lang]="_context.lang()"
						[attr.data-lang]="_context.dataLang()"
						data-sidebar="sidebar"
						data-mobile="true"
						tabindex="-1"
						class="flex min-h-0 w-full flex-1 flex-col"
						[style.width]="sidebarWidthMobile()"
						[style.--sidebar-width]="_wrapper?.sidebarWidth() ?? _config.sidebarWidth"
						[style.--sidebar-width-icon]="_wrapper?.sidebarWidthIcon() ?? _config.sidebarWidthIcon"
						[attr.aria-label]="_label()"
						[attr.aria-labelledby]="_labelledBy()"
					>
						<ng-container [ngTemplateOutlet]="body" />
					</nav>
				</ng-template>
			</caps-sheet>
		} @else {
			<div data-slot="sidebar-gap" class="caps-sidebar-gap"></div>
			<div data-slot="sidebar-container" [class]="_containerClass()">
				<nav
					data-sidebar="sidebar"
					data-slot="sidebar-inner"
					class="caps-sidebar-inner flex size-full flex-col"
					[attr.inert]="_collapsed() && collapsible() === 'offcanvas' ? '' : null"
					[attr.aria-label]="_label()"
					[attr.aria-labelledby]="_labelledBy()"
				>
					<ng-container [ngTemplateOutlet]="body" />
				</nav>
				<ng-content select="button[capsSidebarRail]" />
			</div>
		}
	`,
})
export class CapsSidebar {
	protected readonly _service = inject(CapsSidebarService);
	protected readonly _context = inject(CapsSidebarContext);
	protected readonly _direction = this._context.direction;
	protected readonly _wrapper = inject(CapsSidebarWrapper, { optional: true });
	protected readonly _config = injectCapsSidebarConfig();
	public readonly side = input<'left' | 'right'>('left');
	public readonly variant = input<SidebarVariant>();
	public readonly collapsible = input<'offcanvas' | 'icon' | 'none'>('offcanvas');
	public readonly sidebarWidthMobile = input<string>(this._config.sidebarWidthMobile);
	public readonly srOnlySheetTitle = input('Sidebar');
	public readonly srOnlySheetDescription = input('Displays the mobile sidebar.');
	public readonly sidebarContainerClass = input<ClassValue>('');
	// Native landmark attributes are forwarded to the owned nav, not duplicated on a generic host.
	public readonly ariaLabel = input<string>('Sidebar', { alias: 'aria-label' });
	public readonly ariaLabelledby = input<string | null>(null, { alias: 'aria-labelledby' });
	protected readonly _label = computed(() => (this.ariaLabelledby() ? null : this.ariaLabel()));
	protected readonly _labelledBy = this.ariaLabelledby;
	protected readonly _variant = computed(() => this.variant() ?? this._service.variant());
	protected readonly _collapsed = computed(
		() => !this._service.isMobile() && this.collapsible() !== 'none' && !this._service.open(),
	);
	protected readonly _containerClass = computed(() => hlm('caps-sidebar-container', this.sidebarContainerClass()));
	protected readonly _mobileClass = computed(() => 'caps-sidebar-mobile');
	constructor() {
		classes(() => [
			'caps-sidebar group peer text-sidebar-foreground',
			this.collapsible() === 'none'
				? 'caps-sidebar-static'
				: this._service.isMobile()
					? 'caps-sidebar-mobile-host'
					: 'caps-sidebar-desktop',
		]);
		effect(() => {
			const variant = this.variant();
			if (variant !== undefined) this._service.setVariant(variant);
		});
	}
}
