import { workspaceRoot } from '@nx/devkit';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { NestedStructure } from './executor';
it('documents the four public typed Date Pickers and inherited native editing API without implementation boundaries', () => {
	const api = (
		JSON.parse(
			readFileSync(join(workspaceRoot, 'dist/extracted-metadata/ui-api/date-picker.json'), 'utf8'),
		) as NestedStructure
	)['date-picker']['caps'];
	for (const name of ['CapsDatePicker', 'CapsDateRangePicker', 'CapsDatePickerMulti', 'CapsMonthYearPicker']) {
		expect(api[name].inputs.map((i) => i.name)).toEqual(
			expect.arrayContaining(['date', 'disabled', 'minDate', 'maxDate', 'align', 'placeholder', 'id']),
		);
		expect(api[name].outputs.map((o) => o.name)).toEqual(['dateChange']);
	}
	for (const name of ['CapsDatePickerInput', 'CapsDateRangeInput', 'CapsDateMultiInput', 'CapsMonthYearInput']) {
		expect(api[name].inputs.map((i) => i.name)).toEqual(
			expect.arrayContaining([
				'parseDate',
				'inputId',
				'inputValue',
				'showClear',
				'openOnClick',
				'forceInvalid',
				'placeholder',
				'aria-label',
				'aria-describedby',
			]),
		);
	}
	expect(api['CapsDatePickerMulti'].inputs.map((i) => i.name)).toEqual(
		expect.arrayContaining(['minSelection', 'maxSelection', 'formatDates', 'transformDates']),
	);
	expect(api['CapsDateRangePicker'].inputs.map((i) => i.name)).not.toContain('startDate');
	expect(api['CapsDatePickerBoundary']).toBeUndefined();
});
