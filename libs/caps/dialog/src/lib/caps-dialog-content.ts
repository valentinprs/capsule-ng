import { booleanAttribute, Directive, inject, input, TemplateRef } from '@angular/core';

/** Lazy body. Classes and close-button options belong to the rendered panel. */
@Directive({ selector: 'ng-template[capsDialogContent],ng-template[capsAlertDialogContent]' })
export class CapsDialogContent {
	public readonly template = inject(TemplateRef);
	public readonly className = input('', { alias: 'class' });
	public readonly showCloseButton = input(true, { transform: booleanAttribute });
	public readonly closeLabel = input('Close');
	public readonly size = input<'default' | 'sm'>('default');
}
