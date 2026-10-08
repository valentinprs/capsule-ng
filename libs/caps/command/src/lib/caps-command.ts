import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { CapsCommandBehavior } from './caps-command-behavior';

@Component({
	selector: 'caps-command',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: CapsCommandBehavior,
			inputs: ['id', 'filter', 'search', 'disabled'],
			outputs: ['valueChange', 'searchChange'],
		},
	],
	host: { 'data-slot': 'command' },
	template: `
		<ng-content />
	`,
})
export class CapsCommand {
	constructor() {
		classes(() => 'caps-command flex size-full flex-col overflow-hidden');
	}
}
