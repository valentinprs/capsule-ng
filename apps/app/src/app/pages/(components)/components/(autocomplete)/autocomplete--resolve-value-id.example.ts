import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CapsAutocompleteImports } from '@capsule-ng/caps/autocomplete';

type Assignee = {
	id: string;
	name: string;
};

@Component({
	selector: 'spartan-autocomplete-resolve-value-id',
	imports: [CapsAutocompleteImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'w-full max-w-xs',
	},
	template: `
		<caps-autocomplete [(search)]="search" [itemToString]="itemToString">
			<caps-autocomplete-input placeholder="Search reviewers" />
			<caps-autocomplete-content>
				<caps-autocomplete-empty>No reviewer found.</caps-autocomplete-empty>

				@for (option of filteredOptions(); track $index) {
					<caps-autocomplete-option [value]="option.id">{{ option.name }}</caps-autocomplete-option>
				}
			</caps-autocomplete-content>
		</caps-autocomplete>
	`,
})
export class AutocompleteResolveValueIdPreview {
	private readonly _assignees: Assignee[] = [
		{ id: '1', name: 'Marty McFly' },
		{ id: '2', name: 'Doc Brown' },
		{ id: '3', name: 'Biff Tannen' },
		{ id: '4', name: 'George McFly' },
		{ id: '5', name: 'Jennifer Parker' },
		{ id: '6', name: 'Emmett Brown' },
		{ id: '7', name: 'Einstein' },
		{ id: '8', name: 'Clara Clayton' },
		{ id: '9', name: 'Needles' },
		{ id: '10', name: 'Goldie Wilson' },
		{ id: '11', name: 'Marvin Berry' },
		{ id: '12', name: 'Lorraine Baines' },
		{ id: '13', name: 'Strickland' },
	];

	public readonly search = signal<string>('');

	public itemToString = (assigneeId: string) =>
		this._assignees.find((assignee) => assignee.id === assigneeId)?.name ?? '';

	public readonly filteredOptions = computed(() => {
		return this._assignees.filter((assignee) => assignee.name.toLowerCase().includes(this.search().toLowerCase()));
	});
}
