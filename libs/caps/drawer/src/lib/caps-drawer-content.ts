import { Directive, inject, input, TemplateRef } from '@angular/core';
@Directive({ selector: 'ng-template[capsDrawerContent]' })
export class CapsDrawerContent {
	public readonly template = inject(TemplateRef);
	public readonly className = input('', { alias: 'class' });
	public readonly side = input<'top' | 'bottom' | 'left' | 'right'>('bottom');
	public readonly closeThreshold = input(0.25);
}
