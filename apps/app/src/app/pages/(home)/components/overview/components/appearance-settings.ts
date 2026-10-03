import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInput } from '@capsule-ng/caps/input';
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';
import { CapsSwitch } from '@capsule-ng/caps/switch';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMinus, lucidePlus } from '@ng-icons/lucide';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';

@Component({
	selector: 'spartan-appearance-settings',
	imports: [CapsRadioGroupImports, CapsFieldImports, HlmButtonGroupImports, CapsSwitch, NgIcon, CapsInput, CapsButton],
	providers: [provideIcons({ lucidePlus, lucideMinus })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field-set>
			<caps-field-group>
				<caps-field-set>
					<caps-field-legend>Compute Environment</caps-field-legend>
					<caps-field-description>Select the compute environment for your cluster.</caps-field-description>
					<caps-radio-group value="kubernetes">
						<caps-field-label for="kubernetes">
							<caps-field orientation="horizontal">
								<caps-field-content>
									<span class="font-medium">Kubernetes</span>
									<caps-field-description>Run GPU workloads on a K8s configured cluster.</caps-field-description>
								</caps-field-content>
								<caps-radio value="kubernetes" id="kubernetes"></caps-radio>
							</caps-field>
						</caps-field-label>
						<caps-field-label for="virtual-machine">
							<caps-field orientation="horizontal">
								<caps-field-content>
									<span class="font-medium">Virtual Machine</span>
									<caps-field-description>Access a VM configured cluster to run GPU workloads.</caps-field-description>
								</caps-field-content>
								<caps-radio value="virtual-machine" id="virtual-machine"></caps-radio>
							</caps-field>
						</caps-field-label>
					</caps-radio-group>
				</caps-field-set>
			</caps-field-group>
			<caps-field-separator />
			<caps-field orientation="horizontal">
				<caps-field-content>
					<caps-field-label for="field-input-preview-firstname">Number of GPUs</caps-field-label>
					<caps-field-description>You can add more later.</caps-field-description>
				</caps-field-content>
				<div hlmButtonGroup>
					<input capsInput class="h-7 !w-14 font-mono" [value]="_gpuCount()" />
					<button capsButton variant="outline" size="icon-sm" (click)="_gpuCountDecrease()">
						<ng-icon name="lucideMinus" />
					</button>
					<button capsButton variant="outline" size="icon-sm" (click)="_gpuCountIncrease()">
						<ng-icon name="lucidePlus" />
					</button>
				</div>
			</caps-field>
			<caps-field-separator />
			<caps-field orientation="horizontal">
				<caps-field-content>
					<caps-field-label for="exp-wallpaper-tinting">Wallpaper Tinting</caps-field-label>
					<caps-field-description>Allow the wallpaper to be tinted.</caps-field-description>
				</caps-field-content>
				<caps-switch id="exp-wallpaper-tinting" />
			</caps-field>
		</caps-field-set>
	`,
})
export class AppearanceSettings {
	protected readonly _gpuCount = signal(8);

	protected _gpuCountIncrease(): void {
		this._gpuCount.update((count) => count + 1);
	}

	protected _gpuCountDecrease(): void {
		this._gpuCount.update((count) => Math.max(0, count - 1));
	}
}
