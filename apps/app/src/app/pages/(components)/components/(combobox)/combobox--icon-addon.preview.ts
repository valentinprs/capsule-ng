import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsComboboxImports } from '@capsule-ng/caps/combobox';
import { CapsInputGroupAddon } from '@capsule-ng/caps/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGlobe } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-combobox-icon-addon-preview',
	imports: [CapsComboboxImports, CapsInputGroupAddon, NgIcon],
	providers: [provideIcons({ lucideGlobe })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-combobox>
			<caps-combobox-input placeholder="Select a timezone">
				<caps-input-group-addon>
					<ng-icon name="lucideGlobe" />
				</caps-input-group-addon>
			</caps-combobox-input>
			<caps-combobox-content>
				<caps-combobox-empty>No items found.</caps-combobox-empty>

				@for (timezoneGroup of timezones; track $index) {
					<caps-combobox-group>
						<caps-combobox-label>{{ timezoneGroup.value }}</caps-combobox-label>
						@for (timezone of timezoneGroup.items; track $index) {
							<caps-combobox-option [value]="timezone">{{ timezone }}</caps-combobox-option>
						}
						<caps-combobox-separator></caps-combobox-separator>
					</caps-combobox-group>
				}
			</caps-combobox-content>
		</caps-combobox>
	`,
})
export class ComboboxIconAddonPreview {
	public timezones = [
		{
			value: 'Americas',
			items: [
				'(GMT-5) New York',
				'(GMT-8) Los Angeles',
				'(GMT-6) Chicago',
				'(GMT-5) Toronto',
				'(GMT-8) Vancouver',
				'(GMT-3) São Paulo',
			],
		},
		{
			value: 'Europe',
			items: [
				'(GMT+0) London',
				'(GMT+1) Paris',
				'(GMT+1) Berlin',
				'(GMT+1) Rome',
				'(GMT+1) Madrid',
				'(GMT+1) Amsterdam',
			],
		},
		{
			value: 'Asia/Pacific',
			items: [
				'(GMT+9) Tokyo',
				'(GMT+8) Shanghai',
				'(GMT+8) Singapore',
				'(GMT+4) Dubai',
				'(GMT+11) Sydney',
				'(GMT+9) Seoul',
			],
		},
	];
}
