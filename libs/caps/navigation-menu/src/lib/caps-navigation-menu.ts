import { ChangeDetectionStrategy, Component, Directive, input } from '@angular/core';
import { BrnNavigationMenu, BrnNavigationMenuItem } from '@spartan-ng/brain/navigation-menu';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-navigation-menu',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: BrnNavigationMenu,
			inputs: ['value', 'delayDuration', 'skipDelayDuration', 'orientation', 'openOn'],
			outputs: ['valueChange'],
		},
	],
	host: { role: 'navigation', '[attr.aria-label]': 'ariaLabel()', 'data-slot': 'navigation-menu' },
	template: '<ul role="list" data-slot="navigation-menu-list" class="caps-navigation-menu-list"><ng-content /></ul>',
})
export class CapsNavigationMenu {
	public readonly ariaLabel = input<string>('Main', { alias: 'aria-label' });
	constructor() {
		classes(() => 'caps-navigation-menu relative block max-w-full');
	}
}

@Directive({
	selector: 'li[capsNavigationMenuItem]',
	hostDirectives: [{ directive: BrnNavigationMenuItem, inputs: ['id'] }],
	host: { role: 'listitem', 'data-slot': 'navigation-menu-item' },
})
export class CapsNavigationMenuItem {
	constructor() {
		classes(() => 'caps-navigation-menu-item block');
	}
}
