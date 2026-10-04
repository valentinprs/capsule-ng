import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDialogImports } from '@capsule-ng/caps/dialog';
import { CapsLabelImports } from '@capsule-ng/caps/label';
import { CapsSwitchImports } from '@capsule-ng/caps/switch';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';

@Component({
	selector: 'spartan-dialog-dismiss-options',
	imports: [CapsDialogImports, CapsButtonImports, CapsLabelImports, CapsSwitchImports, CapsTooltipImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-col gap-4">
			<label capsLabel class="flex w-fit items-center" [capsTooltip]="disableCloseTip">
				<caps-switch class="mr-2" [checked]="_disableClose()" (checkedChange)="_disableClose.set($event)" />
				disableClose
			</label>
			<ng-template #disableCloseTip>
				<div class="max-w-56 py-1 text-sm">
					<p class="font-semibold">disableClose</p>
					<p>Ignores Escape and outside clicks. Only a close button can close the dialog.</p>
				</div>
			</ng-template>

			<label capsLabel class="flex w-fit items-center" [capsTooltip]="outsideClickTip">
				<caps-switch
					class="mr-2"
					[checked]="_closeOnOutsidePointerEvents()"
					(checkedChange)="_closeOnOutsidePointerEvents.set($event)"
				/>
				closeOnOutsidePointerEvents
			</label>
			<ng-template #outsideClickTip>
				<div class="max-w-56 py-1 text-sm">
					<p class="font-semibold">closeOnOutsidePointerEvents</p>
					<p>When off, outside clicks no longer close the dialog. Escape still works.</p>
				</div>
			</ng-template>

			<caps-dialog [disableClose]="_disableClose()" [closeOnOutsidePointerEvents]="_closeOnOutsidePointerEvents()">
				<button capsDialogTrigger capsButton variant="outline" class="w-fit">Open Dialog</button>
				<ng-template capsDialogContent let-ctx class="sm:max-w-md">
					<caps-dialog-header>
						<caps-dialog-title>Dismiss options</caps-dialog-title>
						<caps-dialog-description>
							Press Escape or click the backdrop to see how the dialog reacts to the selected options.
						</caps-dialog-description>
					</caps-dialog-header>
					<caps-dialog-footer>
						<button capsButton capsDialogClose>Close</button>
					</caps-dialog-footer>
				</ng-template>
			</caps-dialog>
		</div>
	`,
})
export class DialogDismissOptions {
	protected readonly _disableClose = signal(false);
	protected readonly _closeOnOutsidePointerEvents = signal(true);
}
