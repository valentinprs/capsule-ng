import { CapsCombobox } from './lib/caps-combobox';
import { CapsComboboxChip } from './lib/caps-combobox-chip';
import { CapsComboboxChipInput } from './lib/caps-combobox-chip-input';
import { CapsComboboxChipRemove } from './lib/caps-combobox-chip-remove';
import { CapsComboboxChips } from './lib/caps-combobox-chips';
import { CapsComboboxContent } from './lib/caps-combobox-content';
import { CapsComboboxEmpty } from './lib/caps-combobox-empty';
import { CapsComboboxGroup } from './lib/caps-combobox-group';
import { CapsComboboxInput } from './lib/caps-combobox-input';
import { CapsComboboxLabel } from './lib/caps-combobox-label';
import { CapsComboboxMultiple } from './lib/caps-combobox-multiple';
import { CapsComboboxOption } from './lib/caps-combobox-option';
import { CapsComboboxPlaceholder } from './lib/caps-combobox-placeholder';
import { CapsComboboxSeparator } from './lib/caps-combobox-separator';
import { CapsComboboxStatus } from './lib/caps-combobox-status';
import { CapsComboboxTrigger } from './lib/caps-combobox-trigger';
import { CapsComboboxValue } from './lib/caps-combobox-value';
import { CapsComboboxValueTemplate } from './lib/caps-combobox-value-template';
import { CapsComboboxValues } from './lib/caps-combobox-values';

export * from './lib/caps-combobox';
export * from './lib/caps-combobox-chip';
export * from './lib/caps-combobox-chip-input';
export * from './lib/caps-combobox-chip-remove';
export * from './lib/caps-combobox-chips';
export * from './lib/caps-combobox-content';
export * from './lib/caps-combobox-empty';
export * from './lib/caps-combobox-group';
export * from './lib/caps-combobox-input';
export * from './lib/caps-combobox-label';
export * from './lib/caps-combobox-multiple';
export * from './lib/caps-combobox-option';
export * from './lib/caps-combobox-placeholder';
export * from './lib/caps-combobox-separator';
export * from './lib/caps-combobox-status';
export * from './lib/caps-combobox-trigger';
export * from './lib/caps-combobox-value';
export * from './lib/caps-combobox-value-template';
export * from './lib/caps-combobox-values';

export const CapsComboboxImports = [
	CapsComboboxChipInput,
	CapsComboboxChipRemove,
	CapsComboboxChip,
	CapsComboboxChips,
	CapsComboboxContent,
	CapsComboboxEmpty,
	CapsComboboxGroup,
	CapsComboboxInput,
	CapsComboboxLabel,
	CapsComboboxMultiple,
	CapsComboboxOption,
	CapsComboboxPlaceholder,
	CapsComboboxSeparator,
	CapsComboboxStatus,
	CapsComboboxTrigger,
	CapsComboboxValueTemplate,
	CapsComboboxValue,
	CapsComboboxValues,
	CapsCombobox,
] as const;

/** @internal Angular packaging adapter. */
export { CapsComboboxBehavior as ɵCapsComboboxBehavior } from './lib/caps-combobox-behavior';

/** @internal Angular packaging adapter. */
export { CapsComboboxMultipleBehavior as ɵCapsComboboxMultipleBehavior } from './lib/caps-combobox-multiple-behavior';

export {
	comboboxContainsFilter,
	comboboxEndsWithFilter,
	comboboxStartsWithFilter,
	provideBrnComboboxConfig as provideCapsComboboxConfig,
} from '@spartan-ng/brain/combobox';
export type {
	BrnComboboxConfig as CapsComboboxConfig,
	ComboboxFilter,
	ComboboxFilterOptions,
	ComboboxItemEqualToValue,
	ComboboxItemToString,
} from '@spartan-ng/brain/combobox';
