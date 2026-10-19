import { Component, computed, input } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { type Row } from '@tanstack/angular-table';
import type { Task } from '../services/tasks.models';
import { type TaskFeatures } from '../tasks';

@Component({
	selector: 'spartan-title-cell',
	imports: [CapsBadgeImports],
	template: `
		<caps-badge variant="cool-gray">
			{{ _data().type }}
		</caps-badge>
		{{ _data().title }}
	`,
})
export class TitleCell {
	public readonly row = input.required<Row<TaskFeatures, Task>>();

	protected readonly _data = computed(() => this.row().original);
}
