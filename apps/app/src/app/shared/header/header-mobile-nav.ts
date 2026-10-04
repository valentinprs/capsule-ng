import { Component, computed, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { pageNavs, sidenavItems } from '@spartan-ng/app/app/shared/components/navigation-items';
import { SpartanNewMarker } from '@spartan-ng/app/app/shared/spartan-new-marker';

import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsPopover, CapsPopoverImports } from '@capsule-ng/caps/popover';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
	selector: 'spartan-mobile-nav',
	imports: [CapsButton, NgScrollbarModule, RouterLink, CapsPopoverImports, CapsBadgeImports, SpartanNewMarker],
	template: `
		<caps-popover
			placement="bottom-start"
			[(open)]="_isOpen"
			[autoAlign]="true"
			[alignmentAxisOffset]="-24"
			[caret]="false"
			[dropShadow]="false"
		>
			<button
				capsPopoverTrigger
				capsButton
				variant="ghost"
				class="extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent"
			>
				<div class="relative flex h-8 w-4 items-center justify-center">
					<div class="relative size-4">
						<span
							[class]="
								'bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-(--caps-duration-100) ' +
								_burgerClass()
							"
						></span>
						<span
							[class]="
								'bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-(--caps-duration-100) ' +
								_closeClass()
							"
						></span>
					</div>
					<span class="sr-only">Toggle Menu</span>
				</div>
				<span class="flex h-8 items-center text-lg leading-none font-medium">Menu</span>
			</button>

			<ng-template
				capsPopoverContent
				let-ctx
				[class]="'no-scrollbar bg-background/90 h-screen w-screen overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-(--caps-duration-100)'"
			>
				<div class="flex flex-col gap-12 overflow-auto px-6 py-6 [&_a]:text-2xl [&_a]:font-medium">
					<div class="flex flex-col gap-4">
						<div class="text-muted-foreground text-sm font-medium">Menu</div>
						@for (pageNav of _pageNavs; track pageNav.url) {
							<a [routerLink]="pageNav.url" class="inline-flex items-center gap-2" (click)="_closePopover()">
								{{ pageNav.label }}
								@if (pageNav.new) {
									<span spartanNewMarker></span>
								}
							</a>
						}
					</div>

					@for (item of _navItems; track item.label) {
						<div class="flex flex-col gap-4">
							<div class="text-muted-foreground text-sm font-medium">{{ item.label }}</div>
							@for (link of item.links; track link.url) {
								<a
									[routerLink]="item.url + link.url"
									class="inline-flex items-center gap-2"
									(click)="_closePopover()"
									[class.opacity-(--caps-opacity-50)]="link.wip"
									[class.pointer-events-none]="link.wip"
								>
									{{ link.label }}
									@if (link.new) {
										<span spartanNewMarker></span>
									}
									@if (link.wip) {
										<caps-badge>soon</caps-badge>
									}
								</a>
							}
						</div>
					}
				</div>
			</ng-template>
		</caps-popover>
	`,
})
export class HeaderMobileNav {
	protected readonly _popOver = viewChild.required(CapsPopover);
	protected readonly _isOpen = signal(false);
	protected readonly _burgerClass = computed(() => (this._isOpen() ? 'top-[0.4rem] -rotate-45' : 'top-1'));
	protected readonly _closeClass = computed(() => (this._isOpen() ? 'top-[0.4rem] rotate-45' : 'top-2'));

	protected readonly _navItems = sidenavItems;
	protected readonly _pageNavs = pageNavs;

	protected _closePopover(): void {
		this._popOver().close();
		this._isOpen.set(false);
	}
}
