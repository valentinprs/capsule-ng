import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCheckbox } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
	selector: 'spartan-field-hear',
	imports: [HlmCardImports, CapsFieldImports, CapsCheckbox],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div hlmCard class="py-4 shadow-none">
			<div hlmCardContent>
				<form>
					<caps-field-group>
						<caps-field-set class="gap-4">
							<caps-field-legend>How did you hear about us?</caps-field-legend>
							<caps-field-description class="line-clamp-1">
								Select the option that best describes how you heard about us.
							</caps-field-description>
							<caps-field-group class="flex flex-row flex-wrap gap-2 [--radius:9999rem]">
								@for (option of _options; track option.value) {
									<caps-field-label class="!w-fit">
										<caps-field
											orientation="horizontal"
											class="gap-1.5 overflow-hidden !px-3 !py-1.5 transition-all duration-(--caps-duration-100) ease-linear group-has-data-[state=checked]/field-label:!px-2"
										>
											<caps-checkbox
												class="-ml-6 -translate-x-1 rounded-full! transition-all duration-(--caps-duration-100) ease-linear data-[state=checked]:ml-0 data-[state=checked]:translate-x-0"
												[id]="option.value"
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
			</div>
		</div>
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
