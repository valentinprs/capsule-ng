import { CDK_MENU, CdkMenuBar, CdkMenuGroup, MENU_STACK, MenuStack } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

/** @internal Native disabled buttons must be skipped by CDK's existing roving focus. */
@Directive({
	selector: '[capsMenubarCdk]',
	providers: [
		{ provide: CdkMenuBar, useExisting: CapsMenubarCdk },
		{ provide: CdkMenuGroup, useExisting: CapsMenubarCdk },
		{ provide: CDK_MENU, useExisting: CapsMenubarCdk },
		{ provide: MENU_STACK, useFactory: () => MenuStack.inline('horizontal') },
	],
})
export class CapsMenubarCdk extends CdkMenuBar {
	public override ngAfterContentInit() {
		super.ngAfterContentInit();
		this.keyManager.skipPredicate((item) => item.disabled);
	}
}

@Component({
	selector: 'caps-menubar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [CapsMenubarCdk],
	host: {
		'data-slot': 'menubar',
	},
	template: '<ng-content />',
})
export class CapsMenubar {
	constructor() {
		classes(() => 'caps-menubar flex items-center');
	}
}
