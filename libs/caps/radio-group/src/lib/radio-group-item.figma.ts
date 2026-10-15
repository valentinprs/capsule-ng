// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-15164
// source=libs/caps/radio-group/src/lib/caps-radio.ts
// component=CapsRadio
import figma from 'figma';
import { nestedLabel, slug } from '../../../code-connect/field';

const radio = figma.selectedInstance;

// Figma's "Radio Group" is one radio with a nested Label instance, whose text `caps-radio` projects. `Checked` is the
// `value` of the parent `caps-radio-group`; `Layout` and `Weight` have no equivalent in code.
const label = nestedLabel(radio);
const disabled = radio.getEnum('Disabled', { True: ' disabled', False: '' }) ?? '';

export default {
	example: figma.code`<caps-radio value="${slug(label)}"${disabled}>${label}</caps-radio>`,
	imports: ["import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';"],
	id: 'caps-radio-item',
};
