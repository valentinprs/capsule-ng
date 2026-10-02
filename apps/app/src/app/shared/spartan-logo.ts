import { booleanAttribute, Component, input } from '@angular/core';
@Component({
	selector: 'spartan-logo',
	host: { class: 'flex items-center justify-center' },
	template: `
		<img src="/assets/capsule.svg" alt="Capsule" class="max-h-6 w-full" />
	`,
})
export class SpartanLogo {
	public readonly flat = input(false, { transform: booleanAttribute });
}
