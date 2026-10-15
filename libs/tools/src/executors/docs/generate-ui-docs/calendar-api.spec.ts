import { workspaceRoot } from '@nx/devkit';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { NestedStructure } from './executor';

it('documents all four public Calendar contracts and keeps internal select bridges private', () => {
	const api = (
		JSON.parse(
			readFileSync(join(workspaceRoot, 'dist/extracted-metadata/ui-api/calendar.json'), 'utf8'),
		) as NestedStructure
	)['calendar']['caps'];
	expect(Object.keys(api).sort()).toEqual([
		'CapsCalendar',
		'CapsCalendarMulti',
		'CapsCalendarRange',
		'CapsMonthYearCalendar',
	]);
	for (const name of Object.keys(api)) {
		expect(api[name].inputs.map((i) => i.name)).toEqual(
			expect.arrayContaining(['min', 'max', 'disabled', 'defaultFocusedDate']),
		);
	}
	expect(api['CapsCalendar'].outputs.map((o) => o.name)).toContain('dateChange');
	expect(api['CapsCalendarMulti'].inputs.map((i) => i.name)).toEqual(
		expect.arrayContaining(['date', 'minSelection', 'maxSelection']),
	);
	expect(api['CapsCalendarRange'].outputs.map((o) => o.name)).toEqual(['endDateChange', 'startDateChange']);
	expect(api['CapsMonthYearCalendar'].inputs.map((i) => i.name)).toContain('view');
});
