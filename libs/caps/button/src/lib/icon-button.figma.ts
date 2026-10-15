// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-30428
// source=libs/caps/button/src/lib/caps-button.ts
// component=CapsButton
import figma from 'figma';
import { disabled, element, icon, iconButtonSize, iconImports } from '../../../code-connect/helpers';

const button = figma.selectedInstance;

// `State` (Hover / Focus / Error) is not mapped: hover and focus are CSS states, and the button
// has no error styling in code.
const variant = button.getEnum('Variant', {
	Primary: '',
	Secondary: ' variant="secondary"',
	Outline: ' variant="outline"',
	Ghost: ' variant="ghost"',
	Destructive: ' variant="destructive"',
});
const glyph = icon(button, 'Icon');

// An icon-only button needs an accessible name describing its action.
const snippet = element(
	`<button capsButton${variant}${button.getEnum('Size', iconButtonSize)}${button.getEnum('Disabled', disabled)} aria-label="">`,
	[glyph.markup],
	'</button>',
);

export default {
	example: figma.code`${snippet}`,
	imports: ["import { CapsButtonImports } from '@capsule-ng/caps/button';", ...iconImports([glyph])],
	id: 'caps-icon-button',
};
