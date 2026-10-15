import { _IdGenerator } from '@angular/cdk/a11y';
import { ElementRef, inject } from '@angular/core';
/** @internal Preserve SSR identities and reserve collision-free client IDs. */
export function resizableId(prefix: string): string {
	const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
	const generator = inject(_IdGenerator);
	let generated: string;
	do {
		generated = generator.getId(prefix);
	} while (host.ownerDocument.getElementById(generated));
	return host.getAttribute('id') ?? generated;
}
