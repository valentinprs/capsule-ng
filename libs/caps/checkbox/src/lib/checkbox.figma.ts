// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-26531
// source=libs/caps/checkbox/src/lib/caps-checkbox.ts
// component=CapsCheckbox
import figma from 'figma';
import { disabled } from '../../../code-connect/helpers';

const checkbox = figma.selectedInstance;

// `State` (Focus / Error focus) is not mapped: focus is a CSS state and errors come from form validation.
// `indeterminate` is a model without a boolean transform, so it needs a property binding.
const checked = checkbox.getEnum('Checked', { False: '', True: ' checked', Indeterminate: ' [indeterminate]="true"' });

export default {
	example: figma.code`<caps-checkbox${checked}${checkbox.getEnum('Disabled', disabled)} aria-label="" />`,
	imports: ["import { CapsCheckboxImports } from '@capsule-ng/caps/checkbox';"],
	id: 'caps-checkbox',
};
