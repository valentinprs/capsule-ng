import { Directive, inject, TemplateRef } from '@angular/core';
@Directive({ selector: 'ng-template[capsSelectValue]' })
export class CapsSelectValue<T> {
	public readonly template = inject<TemplateRef<{ $implicit: T }>>(TemplateRef);
	static ngTemplateContextGuard<T>(_directive: CapsSelectValue<T>, context: unknown): context is { $implicit: T } {
		return true;
	}
}

@Directive({ selector: 'ng-template[capsSelectPlaceholder]' })
export class CapsSelectPlaceholder {
	public readonly template = inject(TemplateRef);
}
