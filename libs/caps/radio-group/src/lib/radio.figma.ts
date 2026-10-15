// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-15087
// source=libs/caps/radio-group/src/lib/caps-radio.ts
// component=CapsRadio
import figma from 'figma';
import { disabled } from '../../../code-connect/helpers';

const radio = figma.selectedInstance;

// `Checked` is not mapped: the selection is the `value` of the parent `caps-radio-group`.
// `State` (Focus / Error focus) is not mapped: focus is a CSS state and errors come from form validation.
export default {
	example: figma.code`<caps-radio value=""${radio.getEnum('Disabled', disabled)} />`,
	imports: ["import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';"],
	id: 'caps-radio',
};
