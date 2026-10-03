import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsLabelImports } from '@capsule-ng/caps/label';
import { CapsSwitchImports } from '@capsule-ng/caps/switch';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';

@Component({
	selector: 'spartan-dialog-dismiss-options',
	imports: [HlmDialogImports, CapsButtonImports, CapsLabelImports, CapsSwitchImports, HlmTooltipImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-col gap-4">
			<label capsLabel class="flex w-fit items-center" [hlmTooltip]="disableCloseTip">
				<caps-switch class="mr-2" [checked]="_disableClose()" (checkedChange)="_disableClose.set($event)" />
				disableClose
			</label>
			<ng-template #disableCloseTip>
				<div class="max-w-56 py-1 text-sm">
					<p class="font-semibold">disableClose</p>
					<p>Ignores Escape and outside clicks. Only a close button can close the dialog.</p>
				</div>
			</ng-template>

			<label capsLabel class="flex w-fit items-center" [hlmTooltip]="outsideClickTip">
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

			<hlm-dialog [disableClose]="_disableClose()" [closeOnOutsidePointerEvents]="_closeOnOutsidePointerEvents()">
				<button hlmDialogTrigger capsButton variant="outline" class="w-fit">Open Dialog</button>
				<hlm-dialog-content *hlmDialogPortal="let ctx" class="sm:max-w-md">
					<hlm-dialog-header>
						<h3 hlmDialogTitle>Dismiss options</h3>
						<p hlmDialogDescription>
							Press Escape or click the backdrop to see how the dialog reacts to the selected options.
						</p>
					</hlm-dialog-header>
					<hlm-dialog-footer>
						<button capsButton hlmDialogClose>Close</button>
					</hlm-dialog-footer>
				</hlm-dialog-content>
			</hlm-dialog>
		</div>
	`,
})
export class DialogDismissOptions {
	protected readonly _disableClose = signal(false);
	protected readonly _closeOnOutsidePointerEvents = signal(true);
}
