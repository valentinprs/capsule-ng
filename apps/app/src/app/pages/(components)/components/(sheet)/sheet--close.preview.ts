import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsSheet, CapsSheetImports } from '@capsule-ng/caps/sheet';

@Component({
	selector: 'spartan-sheet-close-preview',
	imports: [CapsSheetImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-sheet #sheetRef>
			<button id="edit-profile" variant="outline" capsSheetTrigger capsButton>Open</button>
			<ng-template capsSheetContent side="right">
				<caps-sheet-header>
					<caps-sheet-title>Sheet</caps-sheet-title>
				</caps-sheet-header>
				<div class="grid flex-1 auto-rows-min gap-6 px-4">
					<div class="grid gap-3">
						<p class="text-sm font-medium">Close sheet by directive</p>
						<button capsButton capsSheetClose>Close</button>
					</div>
					<div class="grid gap-3">
						<p class="text-sm font-medium">Close sheet by reference</p>
						<button capsButton (click)="sheetRef.close({})">Close</button>
					</div>
					<div class="grid gap-3">
						<p class="text-sm font-medium">Close sheet by viewChild reference</p>
						<button capsButton (click)="closeSheet()">Close</button>
					</div>
				</div>
			</ng-template>
		</caps-sheet>
	`,
})
export class SheetClosePreview {
	public readonly viewChildSheetRef = viewChild(CapsSheet);

	closeSheet() {
		this.viewChildSheetRef()?.close({});
	}
}
