import { Component, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { CapsDialogImports } from '@capsule-ng/caps/dialog';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsLabelImports } from '@capsule-ng/caps/label';
import { HlmH4, HlmMuted } from '@spartan-ng/helm/typography';
import { debounceTime, map } from 'rxjs/operators';

@Component({
	selector: 'spartan-dialog-declarative-preview',
	imports: [FormsModule, CapsDialogImports, CapsLabelImports, CapsInputImports, HlmH4, HlmMuted],
	template: `
		<div class="mt-6 space-y-4">
			<p hlmH4>Enter passphrase to open dialog</p>
			<div class="flex flex-col gap-2">
				<label capsLabel for="passphrase" class="px-1">Passphrase</label>
				<input
					id="passphrase"
					name="passphrase"
					capsInput
					[ngModelOptions]="{ standalone: true }"
					[ngModel]="_passphrase()"
					(ngModelChange)="_passphrase.set($event)"
				/>
				<p hlmMuted class="px-1">Hint: It's sparta</p>
			</div>
		</div>
		<caps-dialog [open]="_state()" (closed)="_passphrase.set('')">
			<ng-template capsDialogContent let-ctx>
				<caps-dialog-header class="w-[250px]">
					<caps-dialog-title>Welcome to Sparta</caps-dialog-title>
					<caps-dialog-description>Enjoy declarative dialogs.</caps-dialog-description>
				</caps-dialog-header>
			</ng-template>
		</caps-dialog>
	`,
})
export class DialogDeclarativePreview {
	protected readonly _passphrase = signal<string>('');
	private readonly _debouncedState$ = toObservable(this._passphrase).pipe(
		debounceTime(500),
		map((passphrase) => passphrase === 'sparta'),
	);
	protected readonly _state = toSignal(this._debouncedState$, { initialValue: false });
}
