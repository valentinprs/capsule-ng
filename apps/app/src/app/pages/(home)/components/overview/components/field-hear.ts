import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmCheckbox } from '@spartan-ng/helm/checkbox';

@Component({
	selector: 'spartan-field-hear',
	imports: [CapsCardImports, CapsFieldImports, HlmCheckbox],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-card class="py-4 shadow-none">
			<caps-card-content>
				<form>
					<caps-field-group>
						<caps-field-set class="gap-4">
							<caps-field-legend>How did you hear about us?</caps-field-legend>
							<caps-field-description class="line-clamp-1">
								Select the option that best describes how you heard about us.
							</caps-field-description>
							<caps-field-group class="flex flex-row flex-wrap gap-2 [--radius:9999rem]">
								@for (option of _options; track option.value) {
									<caps-field-label class="!w-fit" [for]="option.value">
										<caps-field
											orientation="horizontal"
											class="gap-1.5 overflow-hidden !px-3 !py-1.5 transition-all duration-(--caps-duration-100) ease-linear group-has-data-[state=checked]/field-label:!px-2"
										>
											<hlm-checkbox
												class="-ml-6 -translate-x-1 rounded-full! transition-all duration-(--caps-duration-100) ease-linear data-[state=checked]:ml-0 data-[state=checked]:translate-x-0"
												[inputId]="option.value"
												[checked]="option.value === 'social-media'"
											/>
											<span class="font-medium">{{ option.label }}</span>
										</caps-field>
									</caps-field-label>
								}
							</caps-field-group>
						</caps-field-set>
					</caps-field-group>
				</form>
			</caps-card-content>
		</caps-card>
	`,
})
export class FieldHear {
	protected _options = [
		{
			label: 'Social Media',
			value: 'social-media',
		},

		{
			label: 'Search Engine',
			value: 'search-engine',
		},
		{
			label: 'Referral',
			value: 'referral',
		},
		{
			label: 'Other',
			value: 'other',
		},
	];
}
