import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsComboboxImports } from '@capsule-ng/caps/combobox';
import { CapsFieldImports } from '@capsule-ng/caps/field';

type Assignee = {
	id: string;
	name: string;
};

@Component({
	selector: 'spartan-combobox-item-to-string-preview',
	imports: [CapsComboboxImports, FormRoot, FormField, CapsButton, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full max-w-xs' },
	template: `
		<form [formRoot]="form">
			<caps-field-group>
				<caps-field>
					<caps-field-label>Assign reviewer</caps-field-label>
					<caps-combobox [(search)]="search" [formField]="form.assignee" [itemToString]="itemToString">
						<caps-combobox-input placeholder="e.g. Einstein" />
						<caps-combobox-content>
							<caps-combobox-empty>No items found.</caps-combobox-empty>

							@for (assignee of filteredOptions(); track $index) {
								<caps-combobox-option [value]="assignee.id">{{ assignee.name }}</caps-combobox-option>
							}
						</caps-combobox-content>
					</caps-combobox>
				</caps-field>
				<caps-field orientation="horizontal">
					<button type="submit" capsButton [disabled]="form().submitting()">Submit</button>
				</caps-field>
			</caps-field-group>
		</form>
	`,
})
export class ComboboxItemToStringPreview {
	public search = signal('');

	protected readonly _model = signal<{ assignee: string }>({ assignee: '8' });

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.assignee, { message: 'Please select an assignee' });
		},
		{
			submission: {
				action: async () => {
					const model = this._model();
					console.log(model);
				},
			},
		},
	);

	public itemToString = (assigneeId: string) =>
		this._assignees.find((assignee) => assignee.id === assigneeId)?.name ?? '';

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

	public readonly filteredOptions = computed(() => {
		return this._assignees.filter((assignee) => assignee.name.toLowerCase().includes(this.search().toLowerCase()));
	});
}
