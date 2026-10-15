// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-28598
// source=libs/caps/button-group/src/lib/caps-button-group.ts
// component=CapsButton
import figma from 'figma';
import { disabled, element, icon, iconButtonSize, iconImports } from '../../../code-connect/helpers';

const button = figma.selectedInstance;

// A button inside `caps-button-group`: the group joins the buttons, so `Position` is not mapped
// (`Top` / `Bottom` come from a `stacked` group). `State` (Hover / Focus) is a CSS state.
const variant = button.getEnum('Variant', { Outline: ' variant="outline"', Ghost: ' variant="ghost"' });
const glyph = icon(button, 'Icon');
// An icon-only button needs an accessible name describing its action.
const open = `<button capsButton${variant}${button.getEnum('Size', iconButtonSize)}${button.getEnum('Disabled', disabled)} aria-label="">`;

export default {
	example: figma.code`${element(open, [glyph.markup], '</button>')}`,
	imports: [
		"import { CapsButtonImports } from '@capsule-ng/caps/button';",
		"import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';",
		...iconImports([glyph]),
	],
	id: 'caps-button-group-icon-button',
};
