import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-input-basic',
	imports: [CapsInputImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<input capsInput aria-label="Text" placeholder="Enter text" />
	`,
})
export class InputBasic {}
