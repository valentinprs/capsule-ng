import { Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsSonnerImports, toast, type ToastT } from '@capsule-ng/caps/sonner';

@Component({
	selector: 'spartan-sonner-preview',
	imports: [CapsSonnerImports, CapsButtonImports],
	template: `
		<caps-toaster closeButton />
		<div class="flex flex-wrap justify-center gap-2">
			<button capsButton type="button" variant="outline" (click)="showToast()">Show Toast</button>
			<button capsButton type="button" variant="outline" (click)="save()">Update by ID</button>
			<button capsButton type="button" variant="outline" (click)="close()">Close latest</button>
		</div>
		<p class="mt-3 text-center text-sm" aria-live="polite">{{ _result() }}</p>
	`,
})
export class SonnerPreview {
	protected readonly _result = signal('Event active');
	private _latest: ToastT['id'] | undefined;
	showToast() {
		this._result.set('Event created');
		this._latest = toast('Event has been created', {
			description: 'Sunday, December 03, 2023 at 9:00 AM',
			duration: 10000,
			closeButton: true,
			action: { label: 'Undo', onClick: () => this._result.set('Event creation undone') },
		});
	}
	save() {
		this._latest = toast.loading('Saving event…', { duration: Number.POSITIVE_INFINITY });
		const id = this._latest;
		setTimeout(() => toast.success('Event saved', { id, duration: 4000 }), 800);
	}
	close() {
		if (this._latest !== undefined) toast.dismiss(this._latest);
	}
}

export const defaultImports = `
import { CapsSonnerImports, toast } from '@capsule-ng/caps/sonner';
`;
export const defaultSkeleton = `
toast('Event has been created.', {
  description: 'Your changes have been applied.',
  action: { label: 'Undo', onClick: () => undo() },
});

const id = toast.loading('Saving…');
toast.success('Saved', { id });
toast.dismiss(id);
`;
