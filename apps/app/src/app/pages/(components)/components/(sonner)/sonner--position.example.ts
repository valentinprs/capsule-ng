import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { toast } from '@capsule-ng/caps/sonner';

@Component({
	selector: 'spartan-sonner-position-example',
	imports: [CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-wrap justify-center gap-2">
			<button capsButton type="button" variant="outline" (click)="showTopLeft()">Top Left</button>
			<button capsButton type="button" variant="outline" (click)="showTopCenter()">Top Center</button>
			<button capsButton type="button" variant="outline" (click)="showTopRight()">Top Right</button>
			<button capsButton type="button" variant="outline" (click)="showBottomLeft()">Bottom Left</button>
			<button capsButton type="button" variant="outline" (click)="showBottomCenter()">Bottom Center</button>
			<button capsButton type="button" variant="outline" (click)="showBottomRight()">Bottom Right</button>
		</div>
	`,
})
export class SonnerPositionExample {
	showTopLeft() {
		toast('Event has been created', {
			position: 'top-left',
		});
	}

	showTopCenter() {
		toast('Event has been created', {
			position: 'top-center',
		});
	}

	showTopRight() {
		toast('Event has been created', {
			position: 'top-right',
		});
	}

	showBottomLeft() {
		toast('Event has been created', {
			position: 'bottom-left',
		});
	}

	showBottomCenter() {
		toast('Event has been created', {
			position: 'bottom-center',
		});
	}

	showBottomRight() {
		toast('Event has been created', {
			position: 'bottom-right',
		});
	}
}
