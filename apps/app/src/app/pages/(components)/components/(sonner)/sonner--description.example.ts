import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { toast } from '@capsule-ng/caps/sonner';

@Component({
	selector: 'spartan-sonner-description-example',
	imports: [CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton type="button" variant="outline" (click)="showToast()">Show Toast</button>
	`,
})
export class SonnerDescriptionExample {
	showToast() {
		toast('Event has been created', {
			description: 'Monday, January 3rd at 6:00pm',
		});
	}
}
