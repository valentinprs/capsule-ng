// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-27724
// source=libs/caps/button-group/src/lib/caps-button-group.ts
// component=CapsButton
import figma from 'figma';
import { buttonSize, disabled, element, iconImports, labelWithIcons } from '../../../code-connect/helpers';

const button = figma.selectedInstance;

// A button inside `caps-button-group`: the group joins the buttons, so `Position` is not mapped
// (`Top` / `Bottom` come from a `stacked` group). `State` (Hover / Focus) is a CSS state.
const variant = button.getEnum('Variant', { Outline: ' variant="outline"', Ghost: ' variant="ghost"' });
const { children, icons } = labelWithIcons(button, true);
const open = `<button capsButton${variant}${button.getEnum('Size', buttonSize)}${button.getEnum('Disabled', disabled)}>`;

export default {
	example: figma.code`${element(open, children, '</button>')}`,
	imports: [
		"import { CapsButtonImports } from '@capsule-ng/caps/button';",
		"import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';",
		...iconImports(icons),
	],
	id: 'caps-button-group-button',
};
