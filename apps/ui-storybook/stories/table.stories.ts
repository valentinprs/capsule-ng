import { Component, signal } from '@angular/core';
import { CapsTable, CapsTableImports } from '@capsule-ng/caps/table';
import { faker } from '@faker-js/faker';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

const createUsers = (numUsers = 5) => {
	return Array.from({ length: numUsers }, () => ({
		name: faker.person.fullName(),
		age: faker.number.int({ min: 10, max: 100 }),
		height: faker.number.int({ min: 140, max: 210 }),
	}));
};

@Component({
	selector: 'table-story',
	standalone: true,
	imports: [...CapsTableImports],
	template: `
		<caps-table-container>
			<table capsTable>
				<caption>People and measurements</caption>
				<thead>
					<tr>
						<th scope="col" truncate>Name</th>
						<th scope="col" class="justify-end">Age</th>
						<th scope="col" class="justify-center">Height</th>
					</tr>
				</thead>
				<tbody>
					@for (row of _data(); track row) {
						<tr>
							<td truncate>{{ row.name }}</td>
							<td class="justify-end">{{ row.age }}</td>
							<td class="justify-center">{{ row.height }}</td>
						</tr>
					}
				</tbody>
			</table>
		</caps-table-container>
	`,
})
class TableStory {
	protected readonly _data = signal(createUsers(20));
}

const meta: Meta<CapsTable> = {
	title: 'Table',
	component: CapsTable,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [TableStory],
		}),
	],
};

export default meta;
type Story = StoryObj<CapsTable>;

export const Default: Story = {
	render: () => ({
		moduleMetadata: {
			imports: [TableStory],
		},
		template: '<table-story/>',
	}),
};

export const Striped: Story = {
	render: () => ({
		moduleMetadata: { imports: [CapsTableImports] },
		template:
			'<caps-table-container><table capsTable striped size="sm" [noBorder]="false"><caption>Compact striped table</caption><thead><tr><th scope="col">Item</th><th scope="col">Amount</th></tr></thead><tbody><tr><th scope="row">Invoice 1</th><td>€120</td></tr><tr><th scope="row">Invoice 2</th><td>€80</td></tr></tbody><tfoot><tr><th scope="row">Total</th><td>€200</td></tr></tfoot></table></caps-table-container>',
	}),
};
