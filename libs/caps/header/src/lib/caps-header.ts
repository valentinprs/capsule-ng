import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChild } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { CapsHeaderMenu } from './caps-header-menu';
import { CapsHeaderMenuSheet } from './caps-header-menu-sheet';
import { CapsHeaderNav } from './caps-header-nav';

/**
 * The application bar. Parts are projected into a fixed layout: visual and title (with the
 * navigation) at the start, actions and the brand logo at the end. The `*capsHeaderNav`
 * navigation is written once: it shows in the bar from the `md` breakpoint, and below it in a
 * sheet opened by a menu button placed before the visual.
 */
@Component({
	selector: 'caps-header',
	imports: [CapsHeaderMenuSheet, NgTemplateOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { role: 'banner', 'data-slot': 'header' },
	template: `
		<div class="caps-header-start" data-slot="header-start">
			<ng-content select="caps-header-menu" />
			@if (_navigation(); as navigation) {
				<caps-header-menu-sheet [navigation]="navigation.template" [texts]="_menu()" />
			}
			<ng-content select="caps-header-visual" />
			<div class="caps-header-brand" data-slot="header-brand">
				<ng-content select="caps-header-title" />
				@if (_navigation(); as navigation) {
					<div class="caps-header-nav" data-slot="header-nav">
						<ng-container [ngTemplateOutlet]="navigation.template" />
					</div>
				}
			</div>
		</div>
		<div class="caps-header-end" data-slot="header-end">
			<ng-content />
			<ng-content select="caps-header-actions" />
			<ng-content select="caps-header-logo" />
		</div>
	`,
})
export class CapsHeader {
	protected readonly _navigation = contentChild(CapsHeaderNav);
	protected readonly _menu = contentChild(CapsHeaderMenu);

	constructor() {
		classes(() => 'caps-header');
	}
}
