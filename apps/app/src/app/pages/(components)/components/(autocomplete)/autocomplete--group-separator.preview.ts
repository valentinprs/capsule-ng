import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CapsAutocompleteImports } from '@capsule-ng/caps/autocomplete';

@Component({
	selector: 'spartan-autocomplete-group-separator-preview',
	imports: [CapsAutocompleteImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-autocomplete [(search)]="search">
			<caps-autocomplete-input placeholder="Select a timezone" />
			<caps-autocomplete-content>
				<caps-autocomplete-empty>No items found.</caps-autocomplete-empty>

				@for (timezoneGroup of filteredTimezones(); track $index) {
					<caps-autocomplete-group>
						<caps-autocomplete-label>{{ timezoneGroup.value }}</caps-autocomplete-label>
						@for (timezone of timezoneGroup.items; track $index) {
							<caps-autocomplete-option [value]="timezone">{{ timezone }}</caps-autocomplete-option>
						}
						<caps-autocomplete-separator></caps-autocomplete-separator>
					</caps-autocomplete-group>
				}
			</caps-autocomplete-content>
		</caps-autocomplete>
	`,
})
export class AutocompleteGroupSeparatorPreview {
	private readonly _timezones = [
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

	public readonly search = signal('');

	public readonly filteredTimezones = computed(() => {
		const search = this.search().toLowerCase();
		return this._timezones
			.map((timezoneGroup) => ({
				...timezoneGroup,
				items: timezoneGroup.items.filter((timezone) => timezone.toLowerCase().includes(search)),
			}))
			.filter((timezoneGroup) => timezoneGroup.items.length > 0);
	});
}
