import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';

@Component({
	selector: 'spartan-field-choice-card-preview',
	imports: [CapsFieldImports, HlmRadioGroupImports],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<caps-field-group>
			<caps-field-set>
				<caps-field-legend variant="label">Compute Environment</caps-field-legend>
				<caps-field-description>Select the compute environment for your cluster.</caps-field-description>
				<hlm-radio-group value="kubernetes">
					<caps-field-label for="kubernetes">
						<caps-field orientation="horizontal">
							<caps-field-content>
								<span class="text-sm font-medium">Kubernetes</span>
								<caps-field-description>Run GPU workloads on a K8s configured cluster.</caps-field-description>
							</caps-field-content>
							<hlm-radio value="kubernetes" inputId="kubernetes" aria-label="Kubernetes">
								<hlm-radio-indicator indicator />
							</hlm-radio>
						</caps-field>
					</caps-field-label>
					<caps-field-label for="virtual-machine">
						<caps-field orientation="horizontal">
							<caps-field-content>
								<span class="text-sm font-medium">Virtual Machine</span>
								<caps-field-description>Access a VM configured cluster to run GPU workloads.</caps-field-description>
							</caps-field-content>
							<hlm-radio value="virtual-machine" inputId="virtual-machine" aria-label="Virtual Machine">
								<hlm-radio-indicator indicator />
							</hlm-radio>
						</caps-field>
					</caps-field-label>
				</hlm-radio-group>
			</caps-field-set>
		</caps-field-group>
	`,
})
export class FieldChoiceCardPreview {}
