import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-card-title',
	imports: [NgTemplateOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'card-title' },
	template: `
		<ng-template #content><ng-content /></ng-template>
		@switch (level()) {
			@case (1) {
				<h1><ng-container [ngTemplateOutlet]="content" /></h1>
			}
			@case (2) {
				<h2><ng-container [ngTemplateOutlet]="content" /></h2>
			}
			@case (4) {
				<h4><ng-container [ngTemplateOutlet]="content" /></h4>
			}
			@case (5) {
				<h5><ng-container [ngTemplateOutlet]="content" /></h5>
			}
			@case (6) {
				<h6><ng-container [ngTemplateOutlet]="content" /></h6>
			}
			@default {
				<h3><ng-container [ngTemplateOutlet]="content" /></h3>
			}
		}
	`,
})
export class CapsCardTitle {
	public readonly level = input<1 | 2 | 3 | 4 | 5 | 6>(3);
	constructor() {
		classes(
			() =>
				'caps-card-title block [&>h1]:font-[inherit] [&>h2]:font-[inherit] [&>h3]:font-[inherit] [&>h4]:font-[inherit] [&>h5]:font-[inherit] [&>h6]:font-[inherit]',
		);
	}
}
