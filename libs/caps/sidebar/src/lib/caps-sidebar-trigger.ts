import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { buttonVariants, type CapsButtonSize, type CapsButtonVariant } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePanelLeft } from '@ng-icons/lucide';
import { BrnButton } from '@spartan-ng/brain/button';
import { classes } from '@spartan-ng/helm/utils';
import { CapsSidebarService } from './caps-sidebar.service';
@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[capsSidebarTrigger]',
	imports: [NgIcon],
	providers: [provideIcons({ lucidePanelLeft })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnButton, inputs: ['disabled'] }],
	host: {
		type: 'button',
		'data-slot': 'sidebar-trigger',
		'data-sidebar': 'trigger',
		'[attr.aria-expanded]': '_service.isMobile() ? _service.openMobile() : _service.open()',
		'(click)': '_service.toggleSidebar()',
	},
	template: '<ng-icon name="lucidePanelLeft" aria-hidden="true" /><span class="sr-only">{{ srOnlyText() }}</span>',
})
export class CapsSidebarTrigger {
	protected readonly _service = inject(CapsSidebarService);
	public readonly variant = input<CapsButtonVariant>('ghost');
	public readonly size = input<CapsButtonSize>('icon-sm');
	constructor() {
		classes(() => buttonVariants({ variant: this.variant(), size: this.size() }));
	}
	public readonly srOnlyText = input('Toggle Sidebar');
}
