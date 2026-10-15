import { CapsAutocomplete } from './lib/caps-autocomplete';
import { CapsAutocompleteContent } from './lib/caps-autocomplete-content';
import { CapsAutocompleteEmpty } from './lib/caps-autocomplete-empty';
import { CapsAutocompleteGroup } from './lib/caps-autocomplete-group';
import { CapsAutocompleteInput } from './lib/caps-autocomplete-input';
import { CapsAutocompleteLabel } from './lib/caps-autocomplete-label';
import { CapsAutocompleteOption } from './lib/caps-autocomplete-option';
import { CapsAutocompleteSearch } from './lib/caps-autocomplete-search';
import { CapsAutocompleteSeparator } from './lib/caps-autocomplete-separator';
import { CapsAutocompleteStatus } from './lib/caps-autocomplete-status';

export * from './lib/caps-autocomplete';
export * from './lib/caps-autocomplete-content';
export * from './lib/caps-autocomplete-empty';
export * from './lib/caps-autocomplete-group';
export * from './lib/caps-autocomplete-input';
export * from './lib/caps-autocomplete-label';
export * from './lib/caps-autocomplete-option';
export * from './lib/caps-autocomplete-search';
export * from './lib/caps-autocomplete-separator';
export * from './lib/caps-autocomplete-status';

export const CapsAutocompleteImports = [
	CapsAutocompleteContent,
	CapsAutocompleteEmpty,
	CapsAutocompleteGroup,
	CapsAutocompleteInput,
	CapsAutocompleteLabel,
	CapsAutocompleteOption,
	CapsAutocompleteSearch,
	CapsAutocompleteSeparator,
	CapsAutocompleteStatus,
	CapsAutocomplete,
] as const;

/** @internal Angular packaging adapter. */
export { CapsAutocompleteBehavior as ɵCapsAutocompleteBehavior } from './lib/caps-autocomplete-behavior';

/** @internal Angular packaging adapter. */
export { CapsAutocompleteSearchBehavior as ɵCapsAutocompleteSearchBehavior } from './lib/caps-autocomplete-search-behavior';

export { provideBrnAutocompleteConfig as provideCapsAutocompleteConfig } from '@spartan-ng/brain/autocomplete';
export type {
	AutocompleteItemEqualToValue,
	AutocompleteItemToString,
	BrnAutocompleteConfig as CapsAutocompleteConfig,
} from '@spartan-ng/brain/autocomplete';
