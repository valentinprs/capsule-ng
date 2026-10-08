import { Directive } from '@angular/core';
import { CapsInput } from '@capsule-ng/caps/input';
import { classes } from '@spartan-ng/helm/utils';
@Directive({
	selector: 'input[capsSidebarInput]',
	hostDirectives: [CapsInput],
	host: { 'data-slot': 'sidebar-input', 'data-sidebar': 'input' },
})
export class CapsSidebarInput {
	constructor() {
		classes(() => 'caps-sidebar-input');
	}
}
