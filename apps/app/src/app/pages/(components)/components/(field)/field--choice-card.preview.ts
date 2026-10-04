import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';

@Component({
	selector: 'spartan-field-choice-card-preview',
	imports: [CapsFieldImports, CapsRadioGroupImports],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<caps-field-group>
			<caps-field-set>
				<caps-field-legend variant="label">Compute Environment</caps-field-legend>
				<caps-field-description>Select the compute environment for your cluster.</caps-field-description>
				<caps-radio-group value="kubernetes">
					<caps-field-label for="kubernetes">
						<caps-field orientation="horizontal">
							<caps-field-content>
								<span class="text-sm font-medium">Kubernetes</span>
								<caps-field-description>Run GPU workloads on a K8s configured cluster.</caps-field-description>
							</caps-field-content>
							<caps-radio value="kubernetes" id="kubernetes" aria-label="Kubernetes"></caps-radio>
						</caps-field>
					</caps-field-label>
					<caps-field-label for="virtual-machine">
						<caps-field orientation="horizontal">
							<caps-field-content>
								<span class="text-sm font-medium">Virtual Machine</span>
								<caps-field-description>Access a VM configured cluster to run GPU workloads.</caps-field-description>
							</caps-field-content>
							<caps-radio value="virtual-machine" id="virtual-machine" aria-label="Virtual Machine"></caps-radio>
						</caps-field>
					</caps-field-label>
				</caps-radio-group>
			</caps-field-set>
		</caps-field-group>
	`,
})
export class FieldChoiceCardPreview {}
