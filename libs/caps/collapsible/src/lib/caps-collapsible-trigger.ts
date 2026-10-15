import { Directive } from '@angular/core';
import { BrnCollapsibleTrigger } from '@spartan-ng/brain/collapsible';

@Directive({
	selector: 'button[capsCollapsibleTrigger]',
	hostDirectives: [{ directive: BrnCollapsibleTrigger, inputs: ['type'] }],
	host: { 'data-slot': 'collapsible-trigger' },
})
export class CapsCollapsibleTrigger {}
