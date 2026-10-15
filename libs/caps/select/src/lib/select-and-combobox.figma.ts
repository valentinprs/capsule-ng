// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-13582
// source=libs/caps/select/src/lib/caps-select.ts
// component=CapsSelect
import figma from 'figma';
import { slug } from '../../../code-connect/field';
import { disabled } from '../../../code-connect/helpers';

const field = figma.selectedInstance;

// One Figma component for both controls: the right decoration tells a Select from a Combobox.
// The options are not read from Figma: the snippet shows one example option to replace by the data.
// Not mapped: `Size` Large / Extra small (no such size in code), `Lines` / `Caption`, the left
// decoration and the prepend text.
const decoration = field.findInstance('.Select & Combobox Right Decoration');
const kind =
	decoration.type === 'INSTANCE' ? decoration.getEnum('Type', { Select: 'select', Combobox: 'combobox' }) : 'select';
const text = field.getString('Value');
const filled = field.getEnum('Filled', { True: true, False: false });
const value = filled ? slug(text) : 'value';
const label = filled ? text : 'Label';
const invalid = field.getEnum('State', { Error: ' forceInvalid', 'Error focus': ' forceInvalid' }) ?? '';
const isDisabled = field.getEnum('Disabled', disabled);

const select = {
	example: figma.code`<caps-select${filled ? ` value="${value}"` : ` placeholder="${text}"`}${
		field.getEnum('Size', { Small: ' size="sm"' }) ?? ''
	}${invalid}${isDisabled}>
	<caps-select-option value="${value}">${label}</caps-select-option>
</caps-select>`,
	imports: ["import { CapsSelectImports } from '@capsule-ng/caps/select';"],
	id: 'caps-select',
};

const combobox = {
	example: figma.code`<caps-combobox${filled ? ` value="${value}"` : ''}${isDisabled}>
	<caps-combobox-input${filled ? '' : ` placeholder="${text}"`}${invalid} />
	<caps-combobox-content>
		<caps-combobox-empty>No items found.</caps-combobox-empty>
		<caps-combobox-option value="${value}">${label}</caps-combobox-option>
	</caps-combobox-content>
</caps-combobox>`,
	imports: ["import { CapsComboboxImports } from '@capsule-ng/caps/combobox';"],
	id: 'caps-select',
};

export default kind === 'combobox' ? combobox : select;
