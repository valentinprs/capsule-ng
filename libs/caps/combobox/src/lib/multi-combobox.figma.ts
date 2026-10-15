// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-14105
// source=libs/caps/combobox/src/lib/caps-combobox-multiple.ts
// component=CapsComboboxMultiple
import figma from 'figma';

// The chips are rendered from the selected values, so the `Tags` slot is not read. The options are
// one example to replace by the data. Not mapped: `Size` (no size in code) and `State` (focus).
export default {
	example: figma.code`<caps-combobox-multiple [(value)]="values">
	<caps-combobox-chips>
		<ng-template capsComboboxValues let-values>
			@for (value of values; track $index) {
				<caps-combobox-chip [value]="value">{{ value }}</caps-combobox-chip>
			}
		</ng-template>
		<input capsComboboxChipInput aria-label="Search" />
	</caps-combobox-chips>
	<caps-combobox-content>
		<caps-combobox-empty>No items found.</caps-combobox-empty>
		<caps-combobox-option value="value">Label</caps-combobox-option>
	</caps-combobox-content>
</caps-combobox-multiple>`,
	imports: ["import { CapsComboboxImports } from '@capsule-ng/caps/combobox';"],
	id: 'caps-combobox-multiple',
};
