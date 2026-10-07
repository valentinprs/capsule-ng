import { booleanAttribute, Directive, inject, input, TemplateRef } from '@angular/core';
@Directive({ selector: 'ng-template[capsSheetContent]' })
export class CapsSheetContent {
	public readonly template = inject(TemplateRef);
	public readonly className = input('', { alias: 'class' });
	public readonly side = input<'top' | 'bottom' | 'left' | 'right'>('right');
	public readonly showCloseButton = input(true, { transform: booleanAttribute });
	public readonly closeLabel = input('Close');
}
