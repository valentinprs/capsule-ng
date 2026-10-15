// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-18886
// source=libs/caps/input/src/lib/caps-input.ts
// component=CapsInput
import figma from 'figma';
import { disabled } from '../../../code-connect/helpers';

const field = figma.selectedInstance;

// Not mapped: `Size` (the input has no size input), `State` (focus is a CSS state, errors come
// from form validation), and `Position` / decorations / prepend / append text, which belong to
// `caps-input-group`.
const text = field.getString('Value');
const value = field.getEnum('Filled', { True: ` value="${text}"`, False: ` placeholder="${text}"` });

export default {
	example: figma.code`<input capsInput${value}${field.getEnum('Disabled', disabled)} />`,
	imports: ["import { CapsInputImports } from '@capsule-ng/caps/input';"],
	id: 'caps-input',
};
