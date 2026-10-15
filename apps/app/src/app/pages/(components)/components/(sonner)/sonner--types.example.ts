import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { toast } from '@capsule-ng/caps/sonner';

@Component({
	selector: 'spartan-sonner-types-example',
	imports: [CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-wrap justify-center gap-2">
			<button capsButton type="button" variant="outline" (click)="showToast()">Default</button>
			<button capsButton type="button" variant="outline" (click)="showSuccess()">Success</button>
			<button capsButton type="button" variant="outline" (click)="showInfo()">Info</button>
			<button capsButton type="button" variant="outline" (click)="showError()">Error</button>
			<button capsButton type="button" variant="outline" (click)="showWarning()">Warning</button>
			<button capsButton type="button" variant="outline" (click)="showPromise()">Promise</button>
		</div>
	`,
})
export class SonnerTypesExample {
	showToast() {
		toast('Event has been created');
	}

	showSuccess() {
		toast.success('Event has been created');
	}

	showError() {
		toast.error('Failed to create event');
	}

	showWarning() {
		toast.warning('Event is missing a name');
	}

	showInfo() {
		toast.info('Event will start in 10 minutes');
	}

	showPromise() {
		toast.promise<{ name: string }>(
			() => new Promise((resolve) => setTimeout(() => resolve({ name: 'Angular Connect' }), 2000)),
			{
				loading: 'Loading...',
				success: (data) => `${data.name} has been created`,
				error: 'Error',
			},
		);
	}
}
