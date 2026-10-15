import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

export type CapsMessageAlign = 'start' | 'end';

@Component({
	selector: 'caps-message',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'message',
		role: 'article',
		'[attr.data-align]': 'align()',
		// Prevent the legacy HTML `align` attribute from forcing text-align.
		'[attr.align]': 'null',
	},
	template: `
		<ng-content />
	`,
})
export class CapsMessage {
	public readonly align = input<CapsMessageAlign>('start');

	constructor() {
		classes(() => 'caps-message group/message relative flex w-full min-w-0 data-[align=end]:flex-row-reverse');
	}
}
