import { ChangeDetectionStrategy, Component, computed, resource, signal } from '@angular/core';
import { CapsComboboxImports } from '@capsule-ng/caps/combobox';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';

interface DirectoryUser {
	id: string;
	name: string;
	username: string;
	email: string;
	title: string;
}

@Component({
	selector: 'spartan-combobox-async-multiple-preview',
	imports: [CapsComboboxImports, CapsSpinnerImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-combobox-multiple [(search)]="search" [itemToString]="itemToString" [filter]="filter">
			<caps-combobox-chips class="max-w-xs">
				<ng-template capsComboboxValues let-values>
					@for (value of values; track $index) {
						<caps-combobox-chip [value]="value">{{ value.name }}</caps-combobox-chip>
					}
				</ng-template>

				<input capsComboboxChipInput aria-label="Search frameworks" />
			</caps-combobox-chips>
			<caps-combobox-content>
				@if (showStatus()) {
					<caps-combobox-status>
						@if (users.error(); as error) {
							{{ error }}
						} @else if (users.isLoading()) {
							<caps-spinner aria-hidden="true" />
							Loading...
						} @else if (search().length === 0) {
							Type to search users.
						} @else {
							No matches for "{{ search() }}".
						}
					</caps-combobox-status>
				}

				@if (users.hasValue()) {
					@for (user of users.value(); track user.id) {
						<caps-combobox-option [value]="user">{{ user.name }}</caps-combobox-option>
					}
				}
			</caps-combobox-content>
		</caps-combobox-multiple>
	`,
})
export class ComboboxAsyncMultiplePreview {
	public search = signal('');

	public itemToString = (user: DirectoryUser) => user.name;

	/** The loader already filters by name, username, email and job title. */
	public readonly filter = () => true;

	public users = resource({
		defaultValue: [],
		params: () => ({ search: this.search() }),
		loader: async ({ params }) => {
			const search = params.search;

			if (search.length === 0) {
				return [];
			}

			return await this.searchUsers(search, (item, query) => item.toLowerCase().includes(query.toLowerCase()));
		},
	});

	public showStatus = computed(() => this.users.error() || this.users.isLoading() || this.users.value().length === 0);

	async searchUsers(query: string, filter: (item: string, query: string) => boolean): Promise<DirectoryUser[]> {
		// Simulate network delay
		await new Promise((resolve) => {
			setTimeout(resolve, Math.random() * 500 + 100);
		});

		// Simulate occasional network errors (1% chance)
		if (Math.random() < 0.01 || query === 'will_error') {
			throw new Error('Network error.');
		}

		return this._allUsers.filter((user) => {
			return (
				filter(user.name, query) ||
				filter(user.username, query) ||
				filter(user.email, query) ||
				filter(user.title, query)
			);
		});
	}

	private readonly _allUsers: DirectoryUser[] = [
		{
			id: 'leslie-alexander',
			name: 'Leslie Alexander',
			username: 'leslie',
			email: 'leslie.alexander@example.com',
			title: 'Product Manager',
		},
		{
			id: 'kathryn-murphy',
			name: 'Kathryn Murphy',
			username: 'kathryn',
			email: 'kathryn.murphy@example.com',
			title: 'Marketing Lead',
		},
		{
			id: 'courtney-henry',
			name: 'Courtney Henry',
			username: 'courtney',
			email: 'courtney.henry@example.com',
			title: 'Design Systems',
		},
		{
			id: 'michael-foster',
			name: 'Michael Foster',
			username: 'michael',
			email: 'michael.foster@example.com',
			title: 'Engineering Manager',
		},
		{
			id: 'lindsay-walton',
			name: 'Lindsay Walton',
			username: 'lindsay',
			email: 'lindsay.walton@example.com',
			title: 'Product Designer',
		},
		{
			id: 'tom-cook',
			name: 'Tom Cook',
			username: 'tom',
			email: 'tom.cook@example.com',
			title: 'Frontend Engineer',
		},
		{
			id: 'whitney-francis',
			name: 'Whitney Francis',
			username: 'whitney',
			email: 'whitney.francis@example.com',
			title: 'Customer Success',
		},
		{
			id: 'jacob-jones',
			name: 'Jacob Jones',
			username: 'jacob',
			email: 'jacob.jones@example.com',
			title: 'Security Engineer',
		},
		{
			id: 'arlene-mccoy',
			name: 'Arlene McCoy',
			username: 'arlene',
			email: 'arlene.mccoy@example.com',
			title: 'Data Analyst',
		},
		{
			id: 'marvin-mckinney',
			name: 'Marvin McKinney',
			username: 'marvin',
			email: 'marvin.mckinney@example.com',
			title: 'QA Specialist',
		},
		{
			id: 'eleanor-pena',
			name: 'Eleanor Pena',
			username: 'eleanor',
			email: 'eleanor.pena@example.com',
			title: 'Operations',
		},
		{
			id: 'jerome-bell',
			name: 'Jerome Bell',
			username: 'jerome',
			email: 'jerome.bell@example.com',
			title: 'DevOps Engineer',
		},
	];
}
