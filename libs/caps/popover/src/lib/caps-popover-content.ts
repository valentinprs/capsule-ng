import { Directive, inject, input, TemplateRef } from '@angular/core';
/** Deferred popover body; class styles its owned panel. */
@Directive({ selector: 'ng-template[capsPopoverContent]' })
export class CapsPopoverContent {
	public readonly template = inject(TemplateRef);
	public readonly className = input('', { alias: 'class' });
}
