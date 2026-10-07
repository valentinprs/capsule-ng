import { Component, input } from '@angular/core';
import { CapsTableImports } from '@capsule-ng/caps/table';

type Column = { label: string; key: string; class?: string };

@Component({
	selector: 'spartan-ui-api-docs-table',
	imports: [...CapsTableImports],
	template: `
		<h4 class="mt-6 mb-2">{{ title() }}</h4>
		<caps-table-container class="no-scrollbar my-6 rounded-lg border">
			<table capsTable class="w-fit min-w-full">
				<thead>
					<tr>
						@for (col of columns(); track col.key) {
							<th scope="col" [class]="col.class">{{ col.label }}</th>
						}
					</tr>
				</thead>
				<tbody>
					@for (row of rows(); track row.name + $index) {
						<tr>
							@for (col of columns(); track col.key) {
								<td [class]="col.class">
									@if (row[col.key]) {
										@if (col.key === 'name') {
											<span [innerHTML]="row[col.key]"></span>
										} @else {
											{{ row[col.key] }}
										}
									} @else {
										<span class="sr-hidden">-</span>
									}
								</td>
							}
						</tr>
					}
				</tbody>
			</table>
		</caps-table-container>
	`,
})
export class UIApiDocsTable {
	public readonly title = input.required<string>();
	// es-lint-disable-next-line @typescript-eslint/no-explicit-any
	public readonly rows = input.required<any[]>();
	public readonly columns = input.required<Column[]>();
}
