import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-select-separator',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { role: 'separator' },
	template: '',
})
export class CapsSelectSeparator {
	constructor() {
		classes(() => 'bg-border -mx-1 my-1 block h-px');
	}
}
