import type { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { CapsDialogImports } from '@capsule-ng/caps/dialog';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Component({
	selector: 'caps-command-dialog',
	imports: [CapsDialogImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-dialog [(open)]="open" [autoFocus]="'input'">
			<ng-template capsDialogContent [class]="_contentClass()" [showCloseButton]="showCloseButton()">
				<caps-dialog-header class="sr-only">
					<caps-dialog-title>{{ title() }}</caps-dialog-title>
					<caps-dialog-description>{{ description() }}</caps-dialog-description>
				</caps-dialog-header>
				<ng-content />
			</ng-template>
		</caps-dialog>
	`,
})
export class CapsCommandDialog {
	public readonly open = model<boolean>(false);
	public readonly title = input<string>('Command Palette');
	public readonly description = input<string>('Search for a command to run...');
	public readonly showCloseButton = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly dialogContentClass = input<ClassValue>('');
	protected readonly _contentClass = computed(() => hlm('caps-command-dialog', this.dialogContentClass()));
}
