import { inject, InjectionToken, type ValueProvider } from '@angular/core';

export interface CapsDatePickerConfig<T> {
	/**
	 * If true, the date picker will close when a date is selected.
	 */
	autoCloseOnSelect: boolean;

	/**
	 * Defines how the date should be displayed in the UI.
	 *
	 * @param date
	 * @returns formatted date
	 */
	formatDate: (date: T) => string;

	/**
	 * Defines how the date should be displayed while the input is focused,
	 * i.e. the format the user is expected to type in.
	 *
	 * @param date
	 * @returns formatted date in the input/edit format
	 */
	formatInputDate: (date: T) => string;

	/**
	 * Defines how the date should be transformed before saving to model/form.
	 *
	 * @param date
	 * @returns transformed date
	 */
	transformDate: (date: T) => T;

	/**
	 * Parse a user-entered string into a date.
	 *
	 * @param value the raw string from the input
	 * @returns the parsed date, or `null` when the value can't be parsed
	 */
	parseDate: (value: string) => T | null;
}

function getDefaultConfig<T>(): CapsDatePickerConfig<T> {
	return {
		formatDate: (date) => (date instanceof Date ? date.toDateString() : `${date}`),
		formatInputDate: (date) => (date instanceof Date ? date.toDateString() : `${date}`),
		transformDate: (date) => date,
		parseDate: (value) => {
			const date = new Date(value);
			return isNaN(date.getTime()) ? null : (date as T);
		},
		autoCloseOnSelect: false,
	};
}

const CapsDatePickerConfigToken = new InjectionToken<CapsDatePickerConfig<unknown>>('CapsDatePickerConfig');

export function provideCapsDatePickerConfig<T>(config: Partial<CapsDatePickerConfig<T>>): ValueProvider {
	return { provide: CapsDatePickerConfigToken, useValue: { ...getDefaultConfig(), ...config } };
}

export function injectCapsDatePickerConfig<T>(): CapsDatePickerConfig<T> {
	const injectedConfig = inject(CapsDatePickerConfigToken, { optional: true });
	return injectedConfig ? (injectedConfig as CapsDatePickerConfig<T>) : getDefaultConfig();
}
